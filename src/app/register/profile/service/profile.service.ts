import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Profile, ProfileResponse } from '../../module/profile.module';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/api/profile/';

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile[]> {
    return this.http.get<ProfileResponse>(this.apiUrl).pipe(
      map(response => response.results)
    )
  }

  createProfile(profileData:any): Observable<any>{
    return this.http.post<any>(this.apiUrl, profileData);
  }
}
