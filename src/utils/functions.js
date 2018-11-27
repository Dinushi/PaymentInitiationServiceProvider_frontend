

export const toggleSignUpClass = () => {
    if (!document.getElementById('signup').className.match(/(?:^|\s)fadeOutLeft(?!\S)/)) {
        document.getElementById('signup').className += ' fadeOutRight';
    }
};
