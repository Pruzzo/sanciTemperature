import { DateTemperature } from "./Models/DateTemperature";

enum httpMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE'
};

export const getLastTemperature = async (): Promise<DateTemperature> => {
    var res = new DateTemperature();
    res.temperature = 18 + Math.random() * 4;
    return res;
}

export const getAvailableDays = async (): Promise<Date[]> => {
    return Array.from({length :10}, (_, index) => 
        new Date(new Date(new Date().setDate(new Date().getDate() - index)))
    )
}

export const getDayTemperatures = async (day: Date): Promise<DateTemperature[]> => {
    return Array.from({ length: 24 }, (_, hour) => ({
        temperature: 0 + Math.random() * 40, // Temperatura casuale tra 0 e 40
        createdAt: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(hour * 1, 0, 0, 0))
    }));
}


export async function Request(url: string, method: httpMethod, body: any | undefined) {
    var requestOptions: RequestInit = {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    if (method == httpMethod.Post) {
        requestOptions.body = JSON.stringify(body);
    }

    return await fetch(url, requestOptions).then(res => {
        if (res.status == 500) {
            alert("500 Internal Server Error");
        }
        return res.json();
    }).then(json => {
        if (!!json)
            return json;
        else return;
    });
}