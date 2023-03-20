const express = require('express')

const { StatusCodes } = require('http-status-codes')

const { sequelize, User, Skill } = require('./models')

const app = express()
app.use(express.json())


app.post('/users', async (req, res) => {
    const { first_name, last_name, role } = req.body

    try {
        const user = await User.create({ first_name, last_name, role })
        res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })
    }
})

app.get('/users', async (req, res) => {
    try {
        // const user = await User.findAll({include:'Skill'}) //!to show data in user table or Array
        const user = await User.findAll()
        res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })
    }
})

//todo: only getting User table data 
// app.get('/users/:uuid', async (req, res) => {
//     const uuid = req.params.uuid
//     try {
//         const user = await User.findOne({
//             where: { user_id: uuid },
//         })
//         res.status(StatusCodes.OK).json({ user })
//     } catch (error) {
//         res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' })
//     }
// })

//todo: For getting values of User table and belonging values from Skill table
app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where: { user_id: uuid },
            include:'skills'
        })
        res.status(StatusCodes.OK).json({ user })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })
    }
})

app.put('/users/:uuid', async(req,res)=>{
    const uuid = req.params.uuid
    const {first_name,last_name, role}= req.body
    try{
        const user = await User.findOne({where : { user_id:uuid}})

        user.first_name= first_name
        user.last_name= last_name
        user.role = role

        await user.save();
        return res.status(StatusCodes.OK).json({user})

    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })

    }
})

app.delete('/users/:uuid', async(req,res)=>{
    const uuid = req.params.uuid

    try{
        const user = await User.findOne({where:{ user_id:uuid}})
        user.destroy()
        res.status(StatusCodes.OK).json({msg:'User Deleted Successfully...'}) 
    }catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })

    }

})
app.post('/skills', async (req, res) => {
    const { user_id, expertise, skill_1, skill_2, skill_3 } = req.body

    try {
        const user = await User.findOne({ where: { user_id: user_id } })
        const skill = await Skill.create({ expertise, skill_1, skill_2, skill_3, user_id: user_id })
        res.status(StatusCodes.OK).json({ skill })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })

    }
})

app.get('/skills', async (req, res) => {
    try {
        // const skills = await Skill.findAll({ include: 'User' }); //OR
        // const skills = await Skill.findAll({ include: [{model: User}] }); //OR
        // const skills = await Skill.findAll({ include: [{model: User, as: user}] }); //OR first we need to define {as:user} in where Association is
        const skill = await Skill.findAll({ include: 'user' }); //OR after defining in {as:user} in Association we can directly use it like this too

        res.status(StatusCodes.OK).json({ skill })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong', error })

    }
})

app.listen({ port: 5000 }, async () => {
    console.log(`\nServer running on port :5000\n`)
    await sequelize.authenticate()
    console.log('\nDatabase Connected Successfully...!')
})
