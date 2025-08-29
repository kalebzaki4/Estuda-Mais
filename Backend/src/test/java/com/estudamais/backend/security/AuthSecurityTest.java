@SpringBootTest
@AutoConfigureMockMvc
class AuthSecurityTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void deveRejeitarLoginComCredenciaisInvalidas() throws Exception {
        String invalidCredentials = "{\"email\":\"invalid@test.com\",\"password\":\"wrong\"}";
        
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidCredentials))
                .andExpect(status().isUnauthorized());
    }
    
    @Test
    void deveRejeitarSenhaFraca() throws Exception {
        String weakPassword = "{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"123\"}";
        
        mockMvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(weakPassword))
                .andExpected(status().isBadRequest());
    }
}