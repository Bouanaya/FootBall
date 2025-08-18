import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function PlayersFormTwoStep(handleAddPlayer) {
  const [step, setStep] = useState(1);
  const form = useForm({
    defaultValues: {
      fullName: "",
      cin: "",
      nationality: "Morocco",
      phone: "",
      guardianName: "",
      guardianPhone: "",
      address: "",
      position: "",
      preferredFoot: "right",
      teamName: "",
      jerseyNumber: "",
      birthDate: "",
      joinDate: new Date(),
      height: "",
      weight: "",
      membershipFee: 0,
      membershipPaid: false,
      medicalNotes: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Submitted values:", values);
    form.reset();
    setStep(1);
  };

  return (
    <div className="w-3/4 mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h2 className="text-2xl font-bold">تسجيل لاعب جديد – خطوة {step}</h2>
      <Form {...form}>
        <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {step === 1 && (
            <>
              {/* Step 1 fields */}
              <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم الكامل</FormLabel>
                  <FormControl><Input placeholder="مثال: سوفیان بن فلان" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              
              <FormField control={form.control} name="cin" render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم البطاقة الوطنية</FormLabel>
                  <FormControl><Input placeholder="AA123456" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>الهاتف</FormLabel>
                  <FormControl><Input placeholder="06XXXXXXXX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="nationality" render={({ field }) => (
                <FormItem>
                  <FormLabel>الجنسية</FormLabel>
                  <FormControl><Input placeholder="Morocco" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem>
                  <FormLabel>المركز</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="اختار المركز" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Forward">Attaquant</SelectItem>
                      <SelectItem value="Midfielder">Milieu</SelectItem>
                      <SelectItem value="Defender">Défenseur</SelectItem>
                      <SelectItem value="Goalkeeper">Gardien</SelectItem>
                      <SelectItem value="guach">Guach</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>

              {/* Add more step 1 fields here if needed */}

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <Button type="button" onClick={() => setStep(2)}>التالي</Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2 fields */}
              <FormField control={form.control} name="membershipFee" render={({ field }) => (
                <FormItem>
                  <FormLabel>واجب الانخراط (درهم)</FormLabel>
                  <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="membershipPaid" render={({ field }) => (
                <FormItem className="">
                   <FormLabel>تم الأداء؟</FormLabel> 
                  <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
              )}/>

              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>العنوان (اختياري)</FormLabel>
                  <FormControl><Textarea placeholder="الحي، المدينة..." rows={2} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="medicalNotes" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>ملاحظات طبية (اختياري)</FormLabel>
                  <FormControl><Textarea placeholder="حساسيات/إصابات..." rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="guardianName" render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم ولي الأمر (اختياري)</FormLabel>
                  <FormControl><Input placeholder="اسم ولي الأمر" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
              <FormField control={form.control} name="guardianPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>هاتف ولي الأمر (اختياري)</FormLabel>
                  <FormControl><Input placeholder="06XXXXXXXX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>رابط صورة اللاعب (اختياري)</FormLabel>
                  <FormControl><Input placeholder="رابط الصورة" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

              <div className="md:col-span-2 flex justify-between gap-3 pt-2">
                <Button type="button" onClick={() => setStep(1)}>السابق</Button>
                <Button type="submit" className='md:col-span-2 flex justify-end gap-3 pt-2'>حفظ اللاعب</Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
