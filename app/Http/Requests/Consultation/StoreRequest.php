<?php

namespace App\Http\Requests\Consultation;

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
            'patient_id' => 'required',
            'blood_type' => 'nullable',
            'height' => 'required',
            'weight' => 'required',
            'food_allergy' => 'nullable',
            'medicine_allergy' => 'nullable',
            'other_allergy' => 'nullable',
            'is_pregnant' => 'nullable',
            'is_disabled' => 'nullable',
            'past_present_illness' => 'nullable',
            'illness' => 'nullable',
            'is_operated' => 'nullable',
            'date_of_operation' => 'nullable',
            'type_of_operation' => 'nullable',
            'hospital_name_operation' => 'nullable',
            'is_hospitalized' => 'nullable',
            'hospital_name_confined' => 'nullable',
            'physician' => 'nullable',
            'diagnosis' => 'nullable' 
        ];
    }
}
