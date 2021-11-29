#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
RUN apt-get update -yq
RUN apt-get install curl gnupg -yq
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs -yq
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN apt-get update -yq
RUN apt-get install curl gnupg -yq
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install nodejs -yq

WORKDIR /src
COPY ["AuroraAlaskanAirCharter.csproj", "."]
RUN dotnet restore "./AuroraAlaskanAirCharter.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "AuroraAlaskanAirCharter.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AuroraAlaskanAirCharter.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuroraAlaskanAirCharter.dll"]