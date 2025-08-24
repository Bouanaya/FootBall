'use client'
import React from 'react'

export default function CartPlayer({ selectedPlayer, card, setCard }) {
  return (
    <div>
        { card &&  selectedPlayer && (
        
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
      {/* Header */}
       
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          onClick={() => setCard(false)}
        >
            
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center">
       
          {/* Player Image */}
          {selectedPlayer.additional?.imageUrl ? (
            <div className="relative inline-block">
              <img
                src={selectedPlayer.additional.imageUrl}
                alt={selectedPlayer.personal?.fullName || 'Player'}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-lg mx-auto">
              <span className="text-3xl font-bold">
                {(selectedPlayer.personal?.fullName || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          
          {/* Player Name & Position */}
          <h2 className="text-2xl font-bold mt-4">{selectedPlayer.personal?.fullName || 'اسم غير متوفر'}</h2>
          <div className="flex items-center justify-center gap-4 mt-2 text-white/90">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {selectedPlayer.football?.position || 'غير محدد'}
            </span>
            {selectedPlayer.football?.jerseyNumber && (
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                #{selectedPlayer.football.jerseyNumber}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Essential Information */}
      <div className="p-6">
        <div className="space-y-3">
          {/* Phone */}
          {selectedPlayer.personal?.phone && (
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">رقم الهاتف</p>
                <p className="font-semibold text-gray-900">{selectedPlayer.personal.phone}</p>
              </div>
              <a
                href={`tel:${selectedPlayer.personal.phone}`}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          )}

          {/* Team Name */}
          {selectedPlayer.football?.teamName && (
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold text-lg">⚽</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">اسم الفريق</p>
                <p className="font-semibold text-gray-900">{selectedPlayer.football.teamName}</p>
              </div>
            </div>
          )}

          {/* Guardian Phone (if available) */}
          {selectedPlayer.guardian?.phone && (
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">هاتف ولي الأمر</p>
                <p className="font-semibold text-gray-900">{selectedPlayer.guardian.phone}</p>
              </div>
              <a
                href={`tel:${selectedPlayer.guardian.phone}`}
                className="p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          )}

          {/* Payment Status */}
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
              {selectedPlayer.financial?.membershipPaid ? (
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500">حالة الدفع</p>
              <p className={`font-semibold ${selectedPlayer.financial?.membershipPaid ? 'text-green-600' : 'text-red-600'}`}>
                {selectedPlayer.financial?.membershipPaid ? 'مدفوع ✅' : 'غير مدفوع ❌'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Card Button */}
      <div className="p-6 border-t bg-gray-50">
        <button
          onClick={() => {
            // Create a FIFA-style printable card
            const printContent = `
              <div style="
                width: 300px; 
                height: 420px; 
                background: linear-gradient(135deg, #1a5f4a 0%, #2d8f6f 50%, #45b892 100%);
                border-radius: 20px 20px 20px 20px;
                color: white;
                font-family: 'Arial Black', Arial, sans-serif;
                position: relative;
                overflow: hidden;
                margin: 20px auto;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
              ">
                <!-- Background Pattern -->
                <div style="
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%);
                "></div>
                
                <!-- Header -->
                <div style="padding: 15px; text-align: center; position: relative; z-index: 2;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div style="font-size: 24px; font-weight: 900; opacity: 0.9;">
                      ${selectedPlayer.football?.jerseyNumber || '99'}
                    </div>
                    <div style="font-size: 12px; font-weight: bold; opacity: 0.9;">
                      ${selectedPlayer.football?.position || 'ST'}
                    </div>
                  </div>
                  
                  <!-- Morocco Flag -->
                  <div style="
                    width: 30px; 
                    height: 20px; 
                    background: linear-gradient(to right, #c1272d 0%, #c1272d 100%);
                    margin: 0 auto 10px auto;
                    border-radius: 3px;
                    position: relative;
                    border: 1px solid rgba(255,255,255,0.3);
                  ">
                    <div style="
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      color: #006233;
                      font-size: 12px;
                      font-weight: bold;
                    ">★</div>
                  </div>
                  
                  <!-- Team Badge Placeholder -->
                  <div style="
                    width: 40px;
                    height: 40px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: bold;
                    border: 2px solid rgba(255,255,255,0.3);
                  ">⚽</div>
                </div>
                
                <!-- Player Image Area -->
                <div style="
                  height: 140px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 10px 0;
                  position: relative;
                  z-index: 2;
                ">
                  ${selectedPlayer.additional?.imageUrl ? `
                    <img src="${selectedPlayer.additional.imageUrl}" alt="${selectedPlayer.personal?.fullName}" style="
                      width: 120px;
                      height: 120px;
                      object-fit: cover;
                      border-radius: 50%;
                      border: 3px solid rgba(255,255,255,0.8);
                      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    ">
                  ` : `
                    <div style="
                      width: 120px;
                      height: 120px;
                      background: rgba(255,255,255,0.2);
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 48px;
                      font-weight: bold;
                      border: 3px solid rgba(255,255,255,0.8);
                      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    ">
                      ${(selectedPlayer.personal?.fullName || 'U').charAt(0).toUpperCase()}
                    </div>
                  `}
                </div>
                
                <!-- Player Name -->
                <div style="
                  text-align: center;
                  margin: 15px 0;
                  position: relative;
                  z-index: 2;
                ">
                  <div style="
                    background: rgba(255,255,255,0.95);
                    color: #1a5f4a;
                    padding: 8px 20px;
                    margin: 0 auto;
                    font-size: 18px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    max-width: 200px;
                  ">
                    ${(selectedPlayer.personal?.fullName || 'PLAYER').split(' ')[0]}
                  </div>
                </div>
                
                <!-- Stats Section -->
                <div style="
                  padding: 0 15px;
                  position: relative;
                  z-index: 2;
                  margin-top: 10px;
                ">
                  <div style="
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6px;
                    font-size: 11px;
                    font-weight: bold;
                    line-height: 1.3;
                  ">
                    <!-- Phone -->
                    <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                      📱 ${selectedPlayer.personal?.phone ? selectedPlayer.personal.phone.substring(0, 10) : 'N/A'}
                    </div>
                    
                    <!-- Team -->
                    <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                      ⚽ ${selectedPlayer.football?.teamName ? selectedPlayer.football.teamName.substring(0, 8) : 'N/A'}
                    </div>
                    
                    <!-- Position -->
                    <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                      🎯 ${selectedPlayer.football?.position || 'ST'}
                    </div>
                    
                    <!-- Payment Status -->
                    <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                      💰 ${selectedPlayer.financial?.membershipPaid ? '✅ PAID' : '❌ DUE'}
                    </div>
                    
                    <!-- Height & Weight -->
                    ${selectedPlayer.football?.height ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                        📏 ${selectedPlayer.football.height}CM
                      </div>
                    ` : `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                        📏 N/A
                      </div>
                    `}
                    
                    ${selectedPlayer.football?.weight ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                        ⚖️ ${selectedPlayer.football.weight}KG
                      </div>
                    ` : `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                        ⚖️ N/A
                      </div>
                    `}
                    
                    <!-- CIN -->
                    ${selectedPlayer.personal?.cin ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center; grid-column: 1 / -1;">
                        🆔 CIN: ${selectedPlayer.personal.cin}
                      </div>
                    ` : ''}
                    
                    <!-- Guardian Phone -->
                    ${selectedPlayer.guardian?.phone ? `
                      <div style="background: rgba(255,255,255,0.15); padding: 4px 6px; border-radius: 3px; text-align: center; grid-column: 1 / -1; border: 1px solid rgba(255,255,255,0.3);">
                        👨‍👩‍👧‍👦 GUARDIAN: ${selectedPlayer.guardian.phone}
                      </div>
                    ` : ''}
                    
                    <!-- Birth Date -->
                    ${selectedPlayer.personal?.birthDate ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                        🎂 ${new Date(selectedPlayer.personal.birthDate).getFullYear()}
                      </div>
                    ` : ''}
                    
                    <!-- Preferred Foot -->
                    ${selectedPlayer.football?.preferredFoot ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center;">
                        🦶 ${selectedPlayer.football.preferredFoot === 'right' ? 'RIGHT' : 'LEFT'}
                      </div>
                    ` : ''}
                    
                    <!-- Membership Fee -->
                    ${selectedPlayer.financial?.membershipFee ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center; grid-column: 1 / -1;">
                        💳 FEE: ${selectedPlayer.financial.membershipFee} DH
                      </div>
                    ` : ''}
                    
                    <!-- Join Date -->
                    ${selectedPlayer.additional?.joinDate ? `
                      <div style="background: rgba(255,255,255,0.1); padding: 4px 6px; border-radius: 3px; text-align: center; grid-column: 1 / -1;">
                        📅 JOINED: ${new Date(selectedPlayer.additional.joinDate).toLocaleDateString('en-GB').replace(/\//g, '/')}
                      </div>
                    ` : ''}
                  </div>
                  
                  <!-- Medical Notes (if any) -->
                  ${selectedPlayer.additional?.medicalNotes ? `
                    <div style="
                      margin-top: 8px;
                      background: rgba(255,0,0,0.2);
                      padding: 6px;
                      border-radius: 4px;
                      font-size: 10px;
                      text-align: center;
                      border: 1px solid rgba(255,0,0,0.4);
                    ">
                      🏥 MEDICAL: ${selectedPlayer.additional.medicalNotes.substring(0, 30)}${selectedPlayer.additional.medicalNotes.length > 30 ? '...' : ''}
                    </div>
                  ` : ''}
                </div>
                
                <!-- Decorative Elements -->
                <div style="
                  position: absolute;
                  top: -30px;
                  right: -30px;
                  width: 80px;
                  height: 80px;
                  background: rgba(255,255,255,0.05);
                  border-radius: 50%;
                  z-index: 1;
                "></div>
                
                <div style="
                  position: absolute;
                  bottom: -40px;
                  left: -40px;
                  width: 100px;
                  height: 100px;
                  background: rgba(255,255,255,0.03);
                  border-radius: 50%;
                  z-index: 1;
                "></div>
              </div>
            `;
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
              <html>
                <head>
                  <title>بطاقة اللاعب - ${selectedPlayer.personal?.fullName}</title>
                  <style>
                    body { margin: 0; padding: 20px; background: #f5f5f5; }
                    @media print { body { background: white; } }
                  </style>
                </head>
                <body>
                  ${printContent}
                  <script>
                    window.onload = function() {
                      window.print();
                      window.onafterprint = function() {
                        window.close();
                      }
                    }
                  </script>
                </body>
              </html>
            `);
            printWindow.document.close();
          }}
          className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg"
        >
          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          تحميل بطاقة اللاعب
        </button>
      </div>
    </div>
  </div>
)}
      
    </div>
  )
}
