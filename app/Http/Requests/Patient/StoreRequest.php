<?php

namespace App\Http\Requests\Patient;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'extension' => 'nullable',
            'date_of_birth' => 'required',
            'employment_status' => 'required',
            'id_number' => 'required|unique:patients,id_number',
            'department' => 'required',
            'address' => 'required',
            'father_name' => 'nullable',
            'father_occupation' => 'nullable',
            'father_date_of_birth' => 'nullable',
            'mother_name' => 'nullable',
            'mother_occupation' => 'nullable',
            'mother_date_of_birth' => 'nullable',
            'person_to_contact_name' => 'nullable',
            'person_to_contact_number' => 'nullable',
            'other_person_to_contact_name' => 'nullable',
            'other_person_to_contact_number' => 'nullable',
            'relation_to_other_person' => 'nullable',
        ];
    }
}
