import React from "react";

function actionTask(url, method, data='', id = ''){

    const options = {
        method: method,
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }

    const promise = fetch(`${url}/${id}`, options);

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
}

export function sendTask(url, data){
    return actionTask(url, 'POST', data)
        .then((task) => {
            return task
        })
        .finally(() => console.log('Zakonczono odpytywanie do API'));
}

export function updateTask(url, id, data){
    return actionTask(url, 'PATCH', data, id)
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
