import { NavigationActions } from 'react-navigation';

let navigator;

function getDrawerNavigator() {
    return navigator;
}

function setDrawerNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

// add other navigation functions that you need and export them

export default {
    navigate,
    getDrawerNavigator,
    setDrawerNavigator
};
