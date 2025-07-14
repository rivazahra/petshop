const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Administrator',
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    name: 'Regular User',
  },
]


const MOCK_TOKEN = "mock-jwt-token-12345"

export const AuthService ={
    async login (email, password){
        await new Promise (resolve => setTimeout(resolve,1000))
        const user = MOCK_USERS.find(u=>u.email === email && u.password === password);

        if(user){
            const userData = {...user}
            delete userData.password

            return {
                success : true,
                user: userData,
                token: MOCK_TOKEN
            }
        }else{
            throw new Error ('Invalid email or password')
        }
    },
    async validateToken (token){
        await new Promise (resolve => setTimeout(resolve,300))
        return token === MOCK_TOKEN
    }
}