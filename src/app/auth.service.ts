// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey    = 'token';
  private rolKey      = 'rol'
  private usernameKey = 'username';

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  login(token: string, rol: string, username: string) {
    console.log('Token recibido:', token);
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.rolKey, rol);
    localStorage.setItem(this.usernameKey, username);
  }


  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolKey);
    localStorage.removeItem(this.usernameKey);
  }
  getRol(): string | null {
    return localStorage.getItem(this.rolKey);
  }
  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
}
