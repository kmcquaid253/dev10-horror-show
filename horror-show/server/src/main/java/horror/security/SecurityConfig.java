package horror.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/create_account").permitAll()
                .antMatchers("/refresh_token").authenticated()
                .antMatchers(HttpMethod.GET,
                        "/api/movie", "/api/movie/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/review", "/api/review/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/actor", "/api/actor/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/director", "/api/director/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/subgenre", "/api/subgenre/*").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/api/friend", "/api/friend/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/api/movie").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST,
                        "/api/review").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET,"/api/watchlist").authenticated()
                .antMatchers(HttpMethod.PUT,
                        "/api/movie/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/api/review").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/api/movie/*").hasAnyRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/api/review").hasAnyRole("USER", "ADMIN")
//                .antMatchers("/**").denyAll()
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}