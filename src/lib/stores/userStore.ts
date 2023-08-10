import { browser } from "$app/environment";
import { isUser, type User } from "$lib/types/user";
import { writable } from "svelte/store";

export const user = writable<User>({name:""});

const getFromLocalStorage = () => {
    let storedUser = localStorage.getItem("user");
    if(storedUser){
        let parsedUser = JSON.parse(storedUser);
        if(isUser(parsedUser)){
            user.set(parsedUser);
            return;
        }
    }
    user.set({name:""});    
}

if(browser){
    const unsubscribe = user.subscribe((user) => {
        if(user.name === "") return;
        localStorage.setItem("user", JSON.stringify(user));
    });
    getFromLocalStorage();
}