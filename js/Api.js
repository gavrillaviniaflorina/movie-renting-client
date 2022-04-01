export default class Data {


    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = "http://localhost:8080" + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',

            },

        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        // if(requiresAuth){
        //     const encodedCredentials=Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
        //     options.headers=['Authorization']=`Basic ${encodedCredentials}`;
        // }

        return fetch(url, options);
    }


    async movies() {
        const response = await this.api("/api/v1/movies");
        return response.json();
    }

    async addMovie(movie) {


        const response = await this.api("/api/v1/movies/add", 'POST', movie);


    }

    async updateMovie(id, movie) {

        await this.api(`/api/v1/movies/update/${id}`, 'PUT', movies);
    }


    async deleteMovie(id) {
        await this.api(`/api/v1/movies/delete/${id}`, 'DELETE');
    }


}