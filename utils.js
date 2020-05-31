module.exports = {
    age: function(timestamp){
        
        const today = new Date()
        const birthdate = new Date(timestamp)
    
        let age = today.getFullYear() - birthdate.getFullYear()
        const month = today.getMonth() - birthdate.getMonth()
            
        today.getDate()
        birthdate.getDate()
    
        if (month < 0 || 
            month == 0 && 
            today.getDate() <= birthdate.getDate()){
            age = age - 1
        }

        return age
    },

    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        var nameOfMonth
        switch (month) {
            case "01": nameOfMonth = "Jan"
                break;
            case "02": nameOfMonth = "Fev"
                break;
            case "03": nameOfMonth = "Mar"
                break;
            case "04": nameOfMonth = "Abr"
                break;
            case "05": nameOfMonth = "Mai"
                break;
            case "06": nameOfMonth = "Jun"
                break;
            case "07": nameOfMonth = "Jul"
                break;
            case "08": nameOfMonth = "Ago"
                break;
            case "09": nameOfMonth = "Set"
                break;
            case "10": nameOfMonth = "Out"
                break;
            case "11": nameOfMonth = "Nov"
                break;
            default: nameOfMonth = "Dez"
                break;
        }
       
        return {
            iso:`${day}/${month}/${year}`,
            birthDay:`${day}/${nameOfMonth}`
        }

        
            
    },

}
