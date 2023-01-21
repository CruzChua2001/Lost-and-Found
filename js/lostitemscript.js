const callAPI = (query) => {
    const url =  (query == "*") ? "https://ux0eruuwu7.execute-api.us-east-1.amazonaws.com/prod/lostandfound" : "https://ux0eruuwu7.execute-api.us-east-1.amazonaws.com/prod/lostandfound/search?q="+query

    axios.get(url)
    .then(response => {
        document.getElementsByClassName("column1")[0].innerHTML = ""
        document.getElementsByClassName("column2")[0].innerHTML = ""
        document.getElementsByClassName("column3")[0].innerHTML = ""
        document.getElementsByClassName("column4")[0].innerHTML = ""
        displayItem(response.data)
    })
}

const displayItem = (data) => {
    const column1Div = document.getElementsByClassName("column1")[0]
    const column2Div = document.getElementsByClassName("column2")[0]
    const column3Div = document.getElementsByClassName("column3")[0]
    const column4Div = document.getElementsByClassName("column4")[0]

    const arrColumnDiv = [column1Div, column2Div, column3Div, column4Div]
    const template = document.querySelector('#itemCardTemplate')
    let i = 3;
        
    data.forEach(e => {
        const itemCard = template.content.cloneNode(true);
        
        i = (i > 0) ? i-=1 : 3
        //--Set the image in the item card
        const img = itemCard.querySelector('.item_card_image')
        img.src = "https://lostandfound-204665e-bucket2.s3.amazonaws.com/images/" + e.id + ".png"

        //--Set the details in the item card
        const table = itemCard.querySelector('.item_card_table')
        
        //set name and location
        const trName = document.createElement("tr");
        const td1Name = document.createElement("td");
        const td2Name = document.createElement("td");

        td1Name.innerHTML = "Item: "
        td2Name.innerHTML = e.itemName
        trName.appendChild(td1Name)
        trName.appendChild(td2Name)
        table.appendChild(trName)

        const trLocation = document.createElement("tr");
        const td1Location = document.createElement("td");
        const td2Location = document.createElement("td");

        td1Location.innerHTML = "Location: "
        td2Location.innerHTML = e.location
        trLocation.appendChild(td1Location)
        trLocation.appendChild(td2Location)
        table.appendChild(trLocation)

        //set extra details
        for (const key in e.details) {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");

            td1.innerHTML = key + ":"
            td2.innerHTML = e.details[key]

            tr.appendChild(td1)
            tr.appendChild(td2)
            table.appendChild(tr)
        }
        
        arrColumnDiv[i].appendChild(itemCard)
    })
}

callAPI("*")

// Search event listener
document.getElementById("searchQuery").addEventListener("keyup" , e => {
    document.getElementsByClassName("column1")[0].innerHTML = ""
    document.getElementsByClassName("column2")[0].innerHTML = ""
    document.getElementsByClassName("column3")[0].innerHTML = ""
    document.getElementsByClassName("column4")[0].innerHTML = ""
    if(e.target==""){
        callAPI("*")
    }
    else {
        callAPI(e.target.value)
    }
})