import {useEffect, useRef, useState} from "react";
import {loadModules} from "esri-loader";
import cl from "./Map.module.css"
import buildPopup from "../../utils/buildPoput.ts";

interface ILocation{
    longitude: number;
    latitude: number;
}

function Map() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null)

    useEffect(() => {
        //getting current location longitude and latitude
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude
            })
        })
    }, [])

    useEffect(() => {
        if(currentLocation && currentLocation.latitude && currentLocation.longitude && mapRef.current){
            const {longitude, latitude} = currentLocation

            let view: any;
            loadModules(["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer"],{
                css: true,
            }).then(([MapView, WebMap, GeoJSONLayer]) => {
                const popupContent = buildPopup(<h1>Hello</h1>)
                console.log(popupContent)
                const template = {
                    title: "Earthquake Info",
                    content: "Magnitude {mag} {type} hit {place} on {time}",
                    fieldInfos: [
                        {
                            fieldName: "time",
                            format: {
                                dateFormat: "short-date-short-time"
                            }
                        }
                    ]
                };

                const renderer = {
                    type: "simple",
                    field: "mag",
                    symbol: {
                        type: "simple-marker",
                        color: "orange",
                        outline: {
                            color: "white"
                        }
                    },
                    visualVariables: [
                        {
                            type: "size",
                            field: "mag",
                            stops: [
                                {
                                    value: 2.5,
                                    size: "4px"
                                },
                                {
                                    value: 8,
                                    size: "40px"
                                }
                            ]
                        }
                    ]
                }

                const geoJSONLayer = new GeoJSONLayer({
                    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
                    copyright: "USGS Earthquakes",
                    popupTemplate: template,
                    renderer: renderer,
                    orderBy: {
                        field: "mag"
                    }
                });

                const webmap = new WebMap({
                    basemap: "gray-vector",
                    layers: [geoJSONLayer]
                })

                view = new MapView({
                    map: webmap,
                    center: [longitude, latitude],
                    zoom: 8,
                    container: mapRef.current
                })


            })
            return () => {
                if(!view){
                    view.destroy()
                }
            }
        }
    }, [currentLocation, mapRef]);
    return (
        <div id={cl.viewDiv} ref={mapRef}>

        </div>
    );
}

export default Map;
