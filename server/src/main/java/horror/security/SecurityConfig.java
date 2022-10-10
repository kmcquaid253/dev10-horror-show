package horror.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    // This method allows configuring web based security for specific http requests.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // we're not using HTML forms in our app
        //so disable CSRF (Cross Site Request Forgery)
        http.csrf().disable();

        // this configures Spring Security to allow
        //CORS related requests (such as preflight checks)
        http.cors();

        // the order of the antMatchers() method calls is important
        // as they're evaluated in the order that they're added
        http.authorizeRequests()
                // new...
                .antMatchers("/authenticate").permitAll()
                .antMatchers(HttpMethod.GET, "/order").permitAll()
                .antMatchers(HttpMethod.GET, "/sighting", "/sighting/*").permitAll()
                .antMatchers(HttpMethod.POST, "/sighting").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/sighting/*").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/sighting/*").hasRole("ADMIN")
                // if we get to this point, let's deny all requests
                .antMatchers("/**").denyAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}