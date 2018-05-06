import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../model/patient';
import { BASE_PATH } from '../variables';
import { ApiGlobalsService } from '../../globals/globals.service';

@Injectable()
export class PatientService {

	protected basePath = 'http://localhost/seed/v1';
	public defaultHeaders = new HttpHeaders();

	constructor(protected httpClient: HttpClient, protected apiGlobalsService: ApiGlobalsService,
	            @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	/**
	 * @param consumes string[] mime-types
	 * @return true: consumes contains 'multipart/form-data', false: otherwise
	 */
	private canConsumeForm(consumes: string[]): boolean {
		const form = 'multipart/form-data';
		for (const consume of consumes) {
			if (form === consume) {
				return true;
			}
		}
		return false;
	}

	public isJsonMime(mime: string): boolean {
		const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
		return mime != null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
	}

	/**
	 * Create a Patient
	 *
	 * @param body Patient
	 */
	public createPatient(body: Patient): Observable<Patient> {
		if (body === null || body === undefined) {
			throw new Error('Required parameter body was null or undefined when calling createPatient.');
		}

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);

		return this.httpClient.post<any>(`${this.basePath}/patients/patient`, body, {
			headers: headers,
		});
	}

	/**
	 * Get all Patients
	 *
	 */
	public getAllPatients(): Observable<Array<Patient>> {

		const headers = this.defaultHeaders;

		return this.httpClient.get<any>(`${this.basePath}/patients`, {
			headers: headers,
		});
	}

	/**
	 * Get Patient
	 *
	 * @param uid
	 */
	public getPatient(uid: number): Observable<Patient> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling getPatient.');
		}

		const headers = this.defaultHeaders;

		return this.httpClient.get<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, {
			headers: headers,
		});
	}

	/**
	 * Delete a Patient
	 *
	 * @param uid
	 */
	public remove(uid: number): Observable<{}> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling remove.');
		}

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);

		return this.httpClient.delete<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, {
			headers: headers,
		});
	}

	/**
	 * Create or Update (idempotent) an existing Patient
	 *
	 * @param uid
	 * @param body Patient
	 */
	public updatePatient(uid: number, body: Patient): Observable<Patient> {
		if (uid === null || uid === undefined) {
			throw new Error('Required parameter uid was null or undefined when calling updatePatient.');
		}
		if (body === null || body === undefined) {
			throw new Error('Required parameter body was null or undefined when calling updatePatient.');
		}

		const headers = this.defaultHeaders.set('Authorization', this.apiGlobalsService.bearer);

		return this.httpClient.put<any>(`${this.basePath}/patients/${encodeURIComponent(String(uid))}`, body, {
			headers: headers,
		});
	}
}
