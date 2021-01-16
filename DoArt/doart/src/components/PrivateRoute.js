import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivteRoute ({ component: component, ...rest}) {
    const userSignin = useSelector((state)=> state.userSignin);
    const userInfo = userSignin;
    return(
        <Route>
{...rest}
render={(props)=> userInfo ? (
    <component {...props}></component>):(
        <Redirect to="/signin" />
    )
}
        </Route>
    )
}