<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Patient\StoreRequest;
use App\Models\Patient;
use Illuminate\Support\Facades\DB;

class PatientController extends Controller
{
    public function retrieve(Request $request)
    {
        $patient = Patient::where('id_number', $request->id_number)->first();
        if ($patient) {
            return response()->json([
                'patient' => $patient,
                'message' => 'Patient successfully retrieved.'
            ], 200);
        }

        return response()->json([
            'message' => 'Patient not found.'
        ], 404);
    }

    public function index()
    {
        $patients = Patient::select(
            DB::raw('CONCAT(first_name, " ", middle_name, " ", last_name, " ", extension) as name'),
            'employment_status',
            'department',
            'last_visit'
        )->get();
        if ($patients) {
            return response()->json([
                'message' => 'Patients found.',
                'patients' => $patients
            ], 200);
        }

        return response()->json([
            'message' => 'Failed to find patients.'
        ], 500);
    }

    public function store(StoreRequest $request)
    {
        $validated = $request->validated();
        $patient = Patient::create($validated);

        if ($patient) {
            return response()->json([
                'message' => 'Patient created successfully.',
                'patient' => $patient
            ], 200);
        }

        return response()->json([
            'message' => 'Failed to create patient.'
        ], 402);
    }
}
