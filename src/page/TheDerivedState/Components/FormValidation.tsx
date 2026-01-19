import { useState } from "react";

/**
 * ✅ FORM VALIDATION với Derived State
 */

const FormValidation = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
    });

    // ✅ DERIVED: Validation errors
    const errors = {
        email: (() => {
            if (!formData.email) return "";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(formData.email) ? "" : "Email không hợp lệ";
        })(),
        
        password: (() => {
            if (!formData.password) return "";
            if (formData.password.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự";
            return "";
        })(),
        
        confirmPassword: (() => {
            if (!formData.confirmPassword) return "";
            return formData.password === formData.confirmPassword 
                ? "" 
                : "Mật khẩu không khớp";
        })(),
        
        age: (() => {
            if (!formData.age) return "";
            const ageNum = parseInt(formData.age);
            if (isNaN(ageNum)) return "Tuổi phải là số";
            if (ageNum < 18) return "Phải từ 18 tuổi trở lên";
            if (ageNum > 120) return "Tuổi không hợp lệ";
            return "";
        })(),
    };

    // ✅ DERIVED: Password strength
    const passwordStrength = (() => {
        const password = formData.password;
        if (!password) return { level: 0, text: "", color: "bg-gray-700" };
        
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        if (score <= 2) return { level: score, text: "Yếu", color: "bg-red-500" };
        if (score <= 4) return { level: score, text: "Trung bình", color: "bg-amber-500" };
        return { level: score, text: "Mạnh", color: "bg-green-500" };
    })();

    // ✅ DERIVED: Form validity
    const hasAllFields = Object.values(formData).every(value => value.trim() !== "");
    const hasNoErrors = Object.values(errors).every(error => error === "");
    const isFormValid = hasAllFields && hasNoErrors;

    // ✅ DERIVED: Completion percentage
    const filledFields = Object.values(formData).filter(v => v.trim() !== "").length;
    const completionPercentage = Math.round((filledFields / Object.keys(formData).length) * 100);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            alert("Form submitted successfully!");
        }
    };

    return (
        <div className="max-w-md">
            {/* Progress bar */}
            <div className="mb-5">
                <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-400">Hoàn thành</span>
                    <span className={isFormValid ? "text-green-400" : "text-violet-400"}>{completionPercentage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-300 ${isFormValid ? 'bg-green-500' : 'bg-violet-500'}`}
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 rounded-lg text-white text-sm focus:outline-none border-2 transition-colors ${
                            errors.email ? 'border-red-500' : 'border-gray-700 focus:border-violet-500'
                        }`}
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 rounded-lg text-white text-sm focus:outline-none border-2 transition-colors ${
                            errors.password ? 'border-red-500' : 'border-gray-700 focus:border-violet-500'
                        }`}
                    />
                    {errors.password && <span className="text-red-400 text-xs mt-1">{errors.password}</span>}
                    
                    {/* Password Strength */}
                    {formData.password && (
                        <div className="mt-2">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5, 6].map(level => (
                                    <div 
                                        key={level}
                                        className={`flex-1 h-1 rounded ${level <= passwordStrength.level ? passwordStrength.color : 'bg-gray-700'}`}
                                    />
                                ))}
                            </div>
                            <span className={`text-xs ${
                                passwordStrength.level <= 2 ? 'text-red-400' : 
                                passwordStrength.level <= 4 ? 'text-amber-400' : 'text-green-400'
                            }`}>
                                Độ mạnh: {passwordStrength.text}
                            </span>
                        </div>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 rounded-lg text-white text-sm focus:outline-none border-2 transition-colors ${
                            errors.confirmPassword ? 'border-red-500' : 
                            formData.confirmPassword && !errors.confirmPassword ? 'border-green-500' : 
                            'border-gray-700 focus:border-violet-500'
                        }`}
                    />
                    {errors.confirmPassword && <span className="text-red-400 text-xs mt-1">{errors.confirmPassword}</span>}
                    {formData.confirmPassword && !errors.confirmPassword && (
                        <span className="text-green-400 text-xs mt-1">✓ Mật khẩu khớp</span>
                    )}
                </div>

                {/* Age */}
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Tuổi:</label>
                    <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-gray-800 rounded-lg text-white text-sm focus:outline-none border-2 transition-colors ${
                            errors.age ? 'border-red-500' : 'border-gray-700 focus:border-violet-500'
                        }`}
                    />
                    {errors.age && <span className="text-red-400 text-xs mt-1">{errors.age}</span>}
                </div>

                <button 
                    type="submit" 
                    disabled={!isFormValid}
                    className={`w-full py-3 rounded-lg font-medium text-white transition-colors ${
                        isFormValid 
                            ? 'bg-green-600 hover:bg-green-500 cursor-pointer' 
                            : 'bg-gray-700 cursor-not-allowed'
                    }`}
                >
                    {isFormValid ? "✓ Đăng ký" : "Vui lòng điền đầy đủ thông tin"}
                </button>
            </form>

            <div className="mt-5 p-4 bg-gray-800 rounded-lg">
                <h5 className="text-sm font-medium text-violet-400 mb-2">📖 Derived State trong Form:</h5>
                <pre className="text-xs text-gray-400 overflow-auto">
{`// Chỉ lưu INPUT data
const [formData, setFormData] = useState({...});

// ✅ DERIVED: errors, isFormValid, passwordStrength
const errors = { email: validate(...), ... };
const isFormValid = hasAllFields && hasNoErrors;
const completionPercentage = (filled / total) * 100;`}
                </pre>
            </div>
        </div>
    );
};

export default FormValidation;
