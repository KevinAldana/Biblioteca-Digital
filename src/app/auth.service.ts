// auth.service.ts
import { Injectable } from '@angular/core';
import { Router }            from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey    = 'token';
  private rolKey      = 'rol'
  private usernameKey = 'username';
  private idKey       = 'id';

  constructor(private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
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
    this.router.navigate(['/login']);
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
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    // Decodificar el token y verificar la expiración
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  }
}

