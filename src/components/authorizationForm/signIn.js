const signIn = async (login, password) => {
    const formData = new FormData();
    
    formData.append('login', login);
    formData.append('password', password);
    formData.append('workspace_id', 1);

    const response = await fetch('https://invadmin.officescheme.ru/App/Auth/API?action=auth', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();

    return result;
}

export default signIn;