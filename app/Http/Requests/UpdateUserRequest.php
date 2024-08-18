<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'username' => Rule::unique('users', 'username')->ignore($this->user->id),
            'password' => [
                'sometimes',
                'required',
                Password::min(8)
                    ->letters()
                    ->symbols()
                    ->numbers()
            ],
            'isAdmin' => ['required', 'boolean'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'isAdmin' => filter_var($this->isAdmin, FILTER_VALIDATE_BOOLEAN),
        ]);
    }
}
