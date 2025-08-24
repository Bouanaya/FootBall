import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  User,
  Phone,
  MapPin,
  Trophy,
  Users,
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon,
  Database,
  Wifi,
  WifiOff,
} from "lucide-react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function PlayerForm({
  setShowAddForm,
  playerToEdit,
  showAddForm,
  update,
  setPlayerToEdit
}) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [firebaseStatus, setFirebaseStatus] = useState({
    connected: true,
    initialized: true,
  });
 
 
  useEffect(() => {
    if (playerToEdit && showAddForm ) {
       
       
      setFormData({
        // Personal
        fullName: playerToEdit.personal?.fullName || "",
        cin: playerToEdit.personal?.cin || "",
        nationality: playerToEdit.personal?.nationality || "Morocco",
        phone: playerToEdit.personal?.phone || "",
        birthDate: playerToEdit.personal?.birthDate
          ? new Date(playerToEdit.personal.birthDate)
          : null,
        address: playerToEdit.personal?.address || "",

        // Guardian
        guardianName: playerToEdit.guardian?.name || "",
        guardianPhone: playerToEdit.guardian?.phone || "",

        // Football
        position: playerToEdit.football?.position || "",
        preferredFoot: playerToEdit.football?.preferredFoot || "right",
        teamName: playerToEdit.football?.teamName || "",
        jerseyNumber: playerToEdit.football?.jerseyNumber || "",
        height: playerToEdit.football?.height || "",
        weight: playerToEdit.football?.weight || "",

        // Financial
        membershipFee: playerToEdit.financial?.membershipFee || 0,
        membershipPaid: playerToEdit.financial?.membershipPaid || false,

        // Additional
        medicalNotes: playerToEdit.additional?.medicalNotes || "",
        imageUrl: playerToEdit.additional?.imageUrl || "",
        joinDate: playerToEdit.additional?.joinDate
          ? new Date(playerToEdit.additional.joinDate)
          : new Date(),

        // Metadata
        createdAt: playerToEdit.metadata?.createdAt
          ? new Date(playerToEdit.metadata.createdAt)
          : new Date(),
        updatedAt: new Date(),
        isActive: playerToEdit.metadata?.isActive ?? true,
      });
    }
  
  }, [playerToEdit, showAddForm]);
 

 const initData ={
   // Personal Information
    fullName: "",
    cin: "",
    nationality: "Morocco",
    phone: "",
    birthDate: null,
    address: "",
    gender: "",

    // Guardian Information
    guardianName: "",
    guardianPhone: "",

    // Football Information
    position: "",
    preferredFoot: "right",
    teamName: "",
    jerseyNumber: "",
    height: "",
    weight: "",

    // Financial Information
    membershipFee: 0,
    membershipPaid: false,

    // Additional Information
    medicalNotes: "",
    imageUrl: "",
    joinDate: new Date(),

    // Firebase metadata
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
 }

const [formData, setFormData] = useState(initData);
    const handleReset = () => {
     setFormData(initData) // 👈 يعاود يولّد نفس الفورم الفارغ
  };

  // Validation functions
  const validateRequired = (value, fieldName) => {
    if (!value || value.toString().trim() === "") {
      return `${fieldName} مطلوب`;
    }
    return null;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^0[5-7][0-9]{8}$/;
    if (phone && !phoneRegex.test(phone)) {
      return "تنسيق رقم الهاتف غير صحيح";
    }
    return null;
  };

  const validateCIN = (cin) => {
    const cinRegex = /^[A-Z]{1,2}[0-9]{6}$/;
    if (cin && !cinRegex.test(cin.toUpperCase())) {
      return "تنسيق رقم البطاقة غير صحيح (مثال: AA123456)";
    }
    return null;
  };

  const validateStep1 = () => {
    const newErrors = {};

    const fullNameError = validateRequired(formData.fullName, "الاسم الكامل");
    if (fullNameError) newErrors.fullName = fullNameError;

    const cinError =
      validateRequired(formData.cin, "رقم البطاقة الوطنية") ||
      validateCIN(formData.cin);
    if (cinError) newErrors.cin = cinError;

    const phoneError =
      validateRequired(formData.phone, "رقم الهاتف") ||
      validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const positionError = validateRequired(formData.position, "المركز");
    if (positionError) newErrors.position = positionError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Firebase-optimized data structure
  const formatForFirebase = (data) => {
    return {
      // Personal Info
      personal: {
        fullName: data.fullName.trim(),
        cin: data.cin.toUpperCase().trim(),
        nationality: data.nationality,
        phone: data.phone,
        birthDate: data.birthDate ? data.birthDate.toISOString() : null,
        address: data.address.trim(),
      },

      // Guardian Info
      guardian: {
        name: data.guardianName.trim(),
        phone: data.guardianPhone,
      },

      // Football Info
      football: {
        position: data.position,
        preferredFoot: data.preferredFoot,
        teamName: data.teamName.trim(),
        jerseyNumber: data.jerseyNumber ? parseInt(data.jerseyNumber) : null,
        height: data.height ? parseFloat(data.height) : null,
        weight: data.weight ? parseFloat(data.weight) : null,
      },

      // Financial Info
      financial: {
        membershipFee: parseFloat(data.membershipFee) || 0,
        membershipPaid: data.membershipPaid,
        paymentHistory: [],
      },

      // Additional Info
      additional: {
        medicalNotes: data.medicalNotes.trim(),
        imageUrl: data.imageUrl.trim(),
        joinDate: data.joinDate.toISOString(),
      },

      // Metadata for Firebase
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
        version: 1,
      },

      // Search fields for Firebase queries
      searchFields: {
        nameSearch: data.fullName.toLowerCase().trim(),
        cinSearch: data.cin.toLowerCase().trim(),
        phoneSearch: data.phone,
      },
    };
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleSubmit = async () => {

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const firebaseData = formatForFirebase(formData);

      if (playerToEdit?.id) {
        // تحديث
        await updateDoc(doc(db, "players", playerToEdit.id), firebaseData);
        setSubmitStatus({
          type: "success",
          message: "تم تحديث اللاعب بنجاح ✅",
        });
        setPlayerToEdit(null)
      } else {
        // إضافة جديدة
        const docRef = await addDoc(collection(db, "players"), firebaseData);
        setSubmitStatus({
          type: "success",
          message: `تم تسجيل اللاعب بنجاح! معرف: ${docRef.id}`,
        });
      }

      setShowAddForm(false);
      // نرجع للجدول باش يحدّث
    } catch (error) {
      console.error("Firebase error:", error);
      setSubmitStatus({ type: "error", message: "خطأ أثناء الحفظ" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };
  return showAddForm ? (
    <div className="  inset-0 bg-black/70 bg-opacity-50  z-40 fixed   ">
      <div
        className="inset-0   absolute w-[60%] top-0 bottom-0  z-50"
        onClick={() => {
          handleReset()
          setShowAddForm(false)
          setPlayerToEdit(null)
          
        
           
          
        }
        }
      ></div>
      <div className="flex justify-end h-full ">
        <div className="bg-white w-[40%]   shadow-xl p-8 overflow-auto">
          <div   className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                  <User className="w-5 h-5" />
                  المعلومات الشخصية
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      الاسم الكامل *
                    </label>
                    <Input
                      placeholder="soufiane"
                      className="text-right"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم البطاقة الوطنية *
                    </label>
                    <Input
                      placeholder="AA123456"
                      value={formData.cin}
                      onChange={(e) =>
                        handleInputChange("cin", e.target.value.toUpperCase())
                      }
                    />
                    {errors.cin && (
                      <p className="text-red-500 text-sm mt-1">{errors.cin}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <Input
                      placeholder="0612345678"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الميلاد
                    </label>
                    <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full text-left font-normal justify-between"
                          onClick={() => setShowCalendar(true)}
                        >
                          {formData.birthDate ? (
                            new Date(formData.birthDate).toLocaleDateString(
                              "ar-MA"
                            )
                          ) : (
                            <span>اختر التاريخ</span>
                          )}
                          <CalendarIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.birthDate}
                          onSelect={(date) => {
                            handleInputChange("birthDate", date);
                            setShowCalendar(false);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4 mt-8">
                  <Trophy className="w-5 h-5" />
                  المعلومات الرياضية
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المركز *
                    </label>
                    <Select
                      value={formData.position}
                      onValueChange={(value) =>
                        handleInputChange("position", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المركز" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GK">حارس مرمى</SelectItem>
                        <SelectItem value="RB">ظهير أيمن</SelectItem>
                        <SelectItem value="LB">ظهير أيسر</SelectItem>
                        <SelectItem value="CB">قلب دفاع</SelectItem>
                        <SelectItem value="RCB">قلب دفاع أيمن</SelectItem>
                        <SelectItem value="LCB">قلب دفاع أيسر</SelectItem>
                        <SelectItem value="CDM">وسط دفاعي</SelectItem>
                        <SelectItem value="CM">وسط ميدان</SelectItem>
                        <SelectItem value="RM">جناح أيمن</SelectItem>
                        <SelectItem value="LM">جناح أيسر</SelectItem>
                        <SelectItem value="CAM">وسط هجومي</SelectItem>
                        <SelectItem value="RW">جناح هجومي أيمن</SelectItem>
                        <SelectItem value="LW">جناح هجومي أيسر</SelectItem>
                        <SelectItem value="CF">مهاجم ثاني</SelectItem>
                        <SelectItem value="ST">مهاجم صريح</SelectItem>
                        <SelectItem value="SS">مهاجم وهمي</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.position && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.position}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      القدم المفضلة
                    </label>
                    <Select
                      value={formData.preferredFoot}
                      onValueChange={(value) =>
                        handleInputChange("preferredFoot", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القدم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="right">يمين</SelectItem>
                        <SelectItem value="left">يسار</SelectItem>
                        <SelectItem value="both">كلاهما</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الجنس
                    </label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجنس" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">ذكر</SelectItem>
                        <SelectItem value="female">أنثى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم القميص
                    </label>
                    <Input
                      type="number"
                      placeholder="10"
                      min="1"
                      max="99"
                      value={formData.jerseyNumber}
                      onChange={(e) =>
                        handleInputChange("jerseyNumber", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الفريق
                    </label>
                    <Input
                      placeholder="الفريق الأول"
                      value={formData.teamName}
                      onChange={(e) =>
                        handleInputChange("teamName", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button onClick={nextStep} className="px-8">
                    التالي
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                  <Users className="w-5 h-5" />
                  معلومات ولي الأمر
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم ولي الأمر
                    </label>
                    <Input
                      placeholder="اسم ولي الأمر"
                      value={formData.guardianName}
                      onChange={(e) =>
                        handleInputChange("guardianName", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      هاتف ولي الأمر
                    </label>
                    <Input
                      placeholder="0612345678"
                      value={formData.guardianPhone}
                      onChange={(e) =>
                        handleInputChange("guardianPhone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4 mt-8">
                  <MapPin className="w-5 h-5" />
                  معلومات إضافية
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الطول (سم)
                    </label>
                    <Input
                      type="number"
                      placeholder="175"
                      value={formData.height}
                      onChange={(e) =>
                        handleInputChange("height", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الوزن (كغ)
                    </label>
                    <Input
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={(e) =>
                        handleInputChange("weight", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      واجب الانخراط (درهم)
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={formData.membershipFee}
                      onChange={(e) =>
                        handleInputChange("membershipFee", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      تم الأداء؟
                    </label>
                    <button
                      type="button"
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.membershipPaid ? "bg-blue-600" : "bg-gray-200"
                      }`}
                      onClick={() =>
                        handleInputChange(
                          "membershipPaid",
                          !formData.membershipPaid
                        )
                      }
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.membershipPaid
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان
                  </label>
                  <Textarea
                    placeholder="الحي، المدينة..."
                    rows={3}
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ملاحظات طبية
                  </label>
                  <Textarea
                    placeholder="حساسيات، إصابات سابقة..."
                    rows={3}
                    value={formData.medicalNotes}
                    onChange={(e) =>
                      handleInputChange("medicalNotes", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رابط صورة اللاعب
                  </label>
                  <Input
                    placeholder="https://..."
                    value={formData.imageUrl}
                    onChange={(e) =>
                      handleInputChange("imageUrl", e.target.value)
                    }
                  />
                </div>

                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={prevStep} className="px-8">
                    السابق
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      isSubmitting ||
                      !firebaseStatus.connected ||
                      !firebaseStatus.initialized
                    }
                    className="px-8 relative"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        جاري الحفظ في Firebase...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                   <div className="flex items-center gap-2">
  <Database className="w-4 h-4" />
  <span>{update ? "تحديث" : "إرسال"}</span>
</div>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    false
  );
}
