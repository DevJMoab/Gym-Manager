const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = function(req, res){
    return res.render("members/index", { members: data.members })
}

// Exibição dos dados
exports.show = function(req, res){
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id 
    })

    if (!foundMember) return res.send("Member not found!")

    var date = new Date(foundMember.created_at)

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return res.render("members/show", { member: member})
}

// Criação dos dados
exports.create = function(req, res){
    return res.render("members/create")
}

// Post dos dados
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
    const id = Number(data.members.length+1)
    
// Organizando os dados
    data.members.push({
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
    
        return res.redirect("/members")
    })
}

// Edição dos dados
exports.edit = function(req, res){
    
    const { id } = req.params

    const foundMember = data.members.find(function(member){
        return id == member.id 
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth),
        created_at: date(foundMember.created_at)
    }

    return res.render("members/edit", { member })
}

// Atualização dos dados
exports.put = function(req, res){
   
    const { id } = req.body
    let index = 0
    
    const foundMember = data.members.find(function(member, foundIndex){
        if( id == member.id){
            index = foundIndex
            return true
        }
    })

    if (!foundMember) return res.send("Member not found!")

    const member = {
        ...foundMember,
        ...req.body,
        birth:  Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write errror!")

        return res.redirect(`/members/${id}`)
    })

}

// Exclusão dos dados
exports.delete = function(req, res){
   
    const { id } = req.body

    const filteredMembers = data.members.filter(function (member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write errror!")
        
        return res.redirect(`/members`)
    }) 
}
