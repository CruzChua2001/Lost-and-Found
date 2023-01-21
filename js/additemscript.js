const uuidv4 = _ => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const isEmpty = str => {
    return (str === "" || str.length === 0)
}

const isEmptyClassValue = arr => {
    let empty = false

    Array.from(arr).forEach(e => {
        const val = e.value

        if(isEmpty(val)) {
            empty = true
        }
    });

    return empty
}

const putResultDB = (data) => {
    const url = "https://ux0eruuwu7.execute-api.us-east-1.amazonaws.com/prod/lostandfound"

    axios.put(url, data)
    .then(response => {
        window.location.href = "lostitem.html"
    })
}

const refreshPage = _ => {
    itemName = document.getElementById("itemName").value = ""
    document.getElementById("location").value = ""
    document.getElementById("datetime").value = ""
    const file = document.getElementById("lostItemFile").value = ""
    document.getElementById("itemDetails").innerHTML = ""
}

//On Click Listener ----Start
document.getElementById("detail_bt").addEventListener("click", () => {
    const template = document.querySelector('#itemDetailsTemplate')
    const detailbody = document.getElementById("itemDetails")
    
    const clone = template.content.cloneNode(true);
    const div = clone.querySelector(".row")
    const button = clone.querySelector(".closeDetail")

    const id = uuidv4().slice(0, 4)

    div.id = id
    button.onclick = () => {
        $('#' + id).remove();
    }

    detailbody.appendChild(clone)
})

document.getElementById("send_bt").addEventListener("click", () => {
    const itemId = uuidv4()
    const file = document.getElementById("lostItemFile").files[0]
    const itemName = document.getElementById("itemName").value
    const location = document.getElementById("location").value
    const datetime = document.getElementById("datetime").value
    const detailType = document.getElementsByClassName("detailtype")
    const details = document.getElementsByClassName("details")
    
    if(isEmpty(itemName) || file === undefined || isEmpty(location) || isEmpty(datetime) || isEmptyClassValue(detailType) || isEmptyClassValue(details)) {
        alert("All fields are required")
        return
    }

    const itemDetails = () => {
        let obj = {}
        for(let i=0; i < detailType.length; i++) {
            obj[detailType[i].value] = details[i].value
        }

        return obj
    }

    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        const data = {
            Item: {
                id: itemId,
                itemName: itemName,
                datetime: datetime,
                location: location,
                details: itemDetails()
            },
            File: reader.result
        }

        putResultDB(data)
        refreshPage()
    }
    
})

//On Click Listener ----End





