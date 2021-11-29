

function preLoadImage(imageURL: string): Promise<boolean> {
    return new Promise((inResolve, inReject) => {
        const image = new Image();
        image.onload = () => {
            inResolve(true);
            return true;
        };
        image.onerror = () => {
            inReject(true);
            return false;
        };
        image.alt = "";
        image.src = imageURL;
    });
}

export function preLoadImages(inImageURLs: string[]): Promise<boolean> {
    return new Promise((inResolve, inReject) => {
        if (inImageURLs == null) return;

        let promisesArray: Promise<boolean>[] = [];

        inImageURLs.forEach((imageURL) => {
            promisesArray.push(preLoadImage(imageURL));
        });

        Promise.all(promisesArray).then(() => {
            console.log("images successfully preloaded.");
            inResolve(true);
            return true;
        }).catch(() => {
            console.log("image error during preload.")
            inReject(true);
            return false;
        });
    });
}


/**
* @function showLayer
* @returns void
* @description display a blacked out layer in the UI
*/
export function showLayer(inMessageId: string): void {
    const overlayElement: HTMLElement = document.querySelector(".message_layer");
    const messageElement: HTMLElement = document.querySelector(inMessageId);
    if (overlayElement && messageElement) {
        overlayElement.classList.add("active");
        messageElement.classList.add("active");
    }
}

    /**
    * @function hideLayer
    * @returns void
    * @description hides a blacked out layer in the UI
    */
    export function hideLayer(inMessageId: string): void {
        const overlayElement: HTMLElement = document.querySelector(".message_layer");
        const messageElement: HTMLElement = document.querySelector(inMessageId);
        if (overlayElement && messageElement) {
            overlayElement.classList.remove("active");
            messageElement.classList.remove("active");
        }

    }
