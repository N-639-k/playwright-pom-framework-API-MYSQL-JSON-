import { request } from '@playwright/test';

export async function getUsersAPI() {
    const apiContext = await request.newContext();
    const response = await apiContext.get('https://reqres.in/api/users?page=2');
    console.log('Status Code :', response.status());
    const responseBody = await response.json();
    console.log(responseBody);
    await apiContext.dispose();
    return responseBody;
}

export async function createUserAPI(user: { name: string; job: string }) {
    const apiContext = await request.newContext();
    const response = await apiContext.post('https://jsonplaceholder.typicode.com/users', {
        data: {
            name: user.name,
            username: user.name,
            email: `${user.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
            company: {
                name: user.job
            }
        }
    });

    console.log('Create User API status:', response.status());
    const responseBody = await response.json();
    console.log(responseBody);
    await apiContext.dispose();
    return responseBody;
}