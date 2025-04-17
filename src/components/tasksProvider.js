import React from "react";

export function sendTask(url, data) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }

    const promise = fetch(url, options)

    return promise
        .then((resp) => {
            if (resp.ok){
                return resp.json();
            }
            if (resp.status === 400){
                return Promise.reject('Bad query to API')
            }
            return Promise.reject(resp);
        })

        .then((task) => {
            return task
        })

        .catch(err => console.error(err))
        .finally(() => console.log('Zakonczono odpytywanie do API'));

}

export function fetchTask(url){

    const promise = fetch(url);

    return promise
        .then((resp) => {
            if (resp.ok){
                return resp.json();
            }
            if (resp.status === 400){
                return Promise.reject('Bad query to API')
            }
            return Promise.reject(resp);
        })

        .then((tasks) => {
            return tasks
        })

        .catch(err => console.error(err))
        .finally(() => console.log('Zakonczono odpytywanie do API'));

}

export function updateTask(url, id, updatedData){
    const promise = fetch(`${url}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: { 'Content-Type': 'application/json' },
    })

    return promise 
        .then((resp) => {
            if (resp.ok){
                return resp.json();
            }
            if (resp.status === 400){
                return Promise.reject('Bad query to API')
            }
            return Promise.reject(resp);
            
        })
    
        .catch(err => console.error(err))
        // .finally(() => console.log('Zakonczono wysylanie danych do API'));

    
}


