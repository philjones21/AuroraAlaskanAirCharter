import axios, { AxiosResponse } from "axios";
import  authService  from "../components/api-authorization/AuthorizeService";

//Interface to define date data format for client/server communication.
export interface ICalendarDate {
    day?: number,
    month: number,
    year: number,
}

//Interface to define flight detail data format for client/server communication.
export interface IFlightDetails {
    flightType: number,
    landingSite?: number,
    departureDate: string, //yyyy-mm-dd
    returnDate?: string, //yyyy-mm-dd
    numberOfPassengers: number,
}


//Interface to define purchase order data format for client/server communication.
export interface IPurchaseOrder {
    flightDetail: IFlightDetails,
    userName: string,
    billingAddress1: string,
    billingAddress2?: string,
    billingAptSuite?: string,
    billingCity: string,
    billingState: string,
    billingZip: string,
    billingCountry: string,
    phoneNo: string,
    mailToAddress1: string,
    mailToAddress2?: string,
    mailToAptSuite?: string,
    mailToCity: string,
    mailToState: string,
    mailToZip: string,
    mailToCountry: string,
}

//Interface to define price totals for client/server communication.
export interface IPricing {
    total?: number,
    subTotal?: number,
    tax?: number,
}

//Interface to define Stripe Purchase Intent and pricing info for client/server communication.
export interface IPurchaseIntentResponse {
    clientSecret: string,
    pricing: IPricing
}


/**
* Helper class for calling RESTful API's on the server
*/
export class WebserviceHelper {

    /**
     * @name getUnavailableDatesPerMonth
     * @descrition Gets an array of available flight dates
     * @param ICalendarDate
     * @returns Promise of type ICalendarDate
     */
    public async getUnavailableDatesPerMonth(inDate: ICalendarDate): Promise<ICalendarDate[]> {
        const response: AxiosResponse = await axios.get(`api/FlightReservations/year/${inDate.year}/month/${inDate.month}`);
        return response.data;
    } 

    /**
      * @name getFlightPrice
      * @param IFlightDetails
      * @returns Promise of type IPricing
      * @description returns price of flight based on Flight Details.
      */
    public async getFlightPrice(inFlightDetails: IFlightDetails): Promise<IPricing> {
        const response: AxiosResponse = await axios.post('api/Purchase/FlightPrice', inFlightDetails);
        return response.data;
    }

    
    /**
  * @name getFlightPriceWithPurchaseIntent
  * @param IFlightDetails
  * @returns Promise of type IPurchaseIntentResponse
  * @description returns price of flight based on Flight Details and Stripe secret.
  */
    public async getFlightPriceWithPurchaseIntent(inFlightDetails: IFlightDetails): Promise<IPurchaseIntentResponse> {
        const response: AxiosResponse = await axios.post('api/Purchase/FlightPurchaseIntent', inFlightDetails);
        return response.data;
    }

    /**
      * @name submitOrder
      * @param IPurchaseOrder
      * @returns Promise of type string with an order reference number
      * @description This function passes a purchase order to the server.
      *  if the order is successful there will be a reference number returned.
      */
    public async submitOrder(inPurchaseOrder: IPurchaseOrder): Promise<string> {
        console.log(JSON.stringify(inPurchaseOrder));

        const token = await authService.getAccessToken();

        const response: AxiosResponse = await axios.post('api/Purchase/PurchaseOrder', inPurchaseOrder,
            {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            
        return response.data;
    }
    
}