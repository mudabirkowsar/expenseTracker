const backendDomain = "https://expensetracker-wvbu.onrender.com";

const SummaryApi = {
    SingupUser : {
        url : `${backendDomain}/getSignupData`,
        method: 'POST'
    },
    LoginUser : {
        url : `${backendDomain}/loginUser`,
        method: 'POST'
    },
    AddProduct : {
        url : `${backendDomain}/addProduct`,
        method: 'POST'
    },
    GetItems : {
        url : `${backendDomain}/getItems`,
        method: 'GET'
    },
    GetPrice:{
        url:`${backendDomain}/getAllPrice`,
        method:'GET'
    },
    ChatBot:{
        url:`${backendDomain}/chatBot`,
        method:'POST'
    }
}

export default SummaryApi;
