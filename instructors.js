const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// Exibição dos dados
exports.show = function(req, res){
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id 
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    var date = new Date(foundInstructor.created_at)

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        skills: foundInstructor.skills.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", { instructor: instructor})
}

// Criação dos dados
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if (req.body[key] == ""){
            return res.send(`Please, fill ${key} field!`)
        }
    }

// Manipulando os dados
let {avatar_url, name, birth, gender, skills } = req.body

// Tratamento dos dados    
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length+1)
    
// Organizando os dados
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        skills,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error!")
    
        return res.redirect("/instructors")
    })
}

// Edição dos dados
exports.edit = function(req, res){
    
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id 
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth),
        created_at: date(foundInstructor.created_at)
    }

    return res.render("instructors/edit", { instructor })
}

// Atualização dos dados
exports.put = function(req, res){
   
    const { id } = req.body

    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id 
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth:  Date.parse(req.body.birth)
    }

    data.instructors[id - 1] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write errror!")

        return res.redirect(`/instructors/${id}`)
    })

}

// Exclusão dos dados
exports.delete = function(req, res){
   
    const { id } = req.body

    const filteredInstructors = data.instructors.filter(function (instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write errror!")
        
        return res.redirect(`/instructors`)
    }) 
}
