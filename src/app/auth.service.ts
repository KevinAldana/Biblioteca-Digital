// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey    = 'token';
  private rolKey      = 'rol'
  private usernameKey = 'username';
  private idKey       = 'id';

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  login(token: string, rol: string, username: string, id: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.rolKey, rol);
    localStorage.setItem(this.usernameKey, username);
    localStorage.setItem(this.idKey, id);
  }


  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.idKey);
  }
  getRol(): string | null {
    return localStorage.getItem(this.rolKey);
  }
  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }
  getId(): string | null {
    return localStorage.getItem(this.idKey);
  }
}
