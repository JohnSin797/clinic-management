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
        Schema::create('examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->cascadeOnDelete();
            $table->longText('medical_history')->nullable();
            $table->longText('family_history')->nullable();
            $table->longText('occupational_history')->nullable();
            $table->longText('physical_examintation')->nullable();
            $table->string('blood_pressure');
            $table->string('temperature');
            $table->boolean('is_impaired_hearing')->default(0);
            $table->boolean('with_glasses')->default(0);
            $table->string('left_eye')->nullable();
            $table->string('right_eye')->nullable();
            $table->string('chest_x_ray')->nullable();
            $table->string('chest_x_ray_findings')->nullable();
            $table->string('complete_blood_count')->default('normal');
            $table->string('routine_urinalysis')->default('normal');
            $table->string('fecalysis_stool_examination')->default('normal');
            $table->string('hepatitis_b_screening')->default('normal');
            $table->string('drug_test')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};
