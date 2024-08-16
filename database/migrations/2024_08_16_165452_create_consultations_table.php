<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->cascadeOnDelete();
            $table->string('blood_type')->nullable();
            $table->string('height');
            $table->string('weight');
            $table->longText('food_allergy')->nullable();
            $table->longText('medicine_allergy')->nullable();
            $table->longText('other_allergy')->nullable();
            $table->boolean('is_pregnant')->default(0);
            $table->boolean('is_disabled')->default(0);
            $table->longText('past_present_illness')->nullable();
            $table->longText('illness')->nullable();
            $table->boolean('is_operated')->default(0);
            $table->date('date_of_operation')->nullable();
            $table->string('type_of_operation')->nullable();
            $table->string('hospital_name_operation')->nullable();
            $table->boolean('is_hospitalized')->default(0);
            $table->string('hospital_name_confined')->nullable();
            $table->string('physician')->nullable();
            $table->string('diagnosis')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultations');
    }
};
