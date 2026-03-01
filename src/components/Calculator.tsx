import { useState, useEffect } from 'react';
import './Calculator.css';

const DAYS_OF_WEEK = [
  { id: 'lunes', label: 'Lu', full: 'Lunes' },
  { id: 'martes', label: 'Ma', full: 'Martes' },
  { id: 'miercoles', label: 'Mi', full: 'Miércoles' },
  { id: 'jueves', label: 'Ju', full: 'Jueves' },
  { id: 'viernes', label: 'Vi', full: 'Viernes' },
  { id: 'sabado', label: 'Sa', full: 'Sábado' },
  { id: 'domingo', label: 'Do', full: 'Domingo' }
];

const TIME_OPTIONS_FULL: string[] = [];
for (let i = 0; i < 24; i++) {
  const hr = i.toString().padStart(2, '0');
  TIME_OPTIONS_FULL.push(`${hr}:00`);
  TIME_OPTIONS_FULL.push(`${hr}:30`);
}

const REGIONES = [
  { id: 'RM', name: 'Región Metropolitana' },
  { id: 'V', name: 'Región de Valparaíso' }
];

const COMUNAS_RM = [
  'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura'
];

const COMUNAS_V = ['Algarrobo'];

type DayConfig = {
  service: string;
  subType: string;
  startTime: string;
  endTime: string;
};

export default function Calculator() {
  const [selectedDays, setSelectedDays] = useState<string[]>(['lunes']);
  const [configs, setConfigs] = useState<Record<string, DayConfig>>({
    'lunes': { service: 'casual', subType: 'presencial', startTime: '09:00', endTime: '13:00' }
  });
  const [children, setChildren] = useState(1);
  const [region, setRegion] = useState('RM');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');
  const [depto, setDepto] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [selectedDays, configs, children]);

  const toggleDay = (dayId: string) => {
    setSelectedDays(prev => {
      const isSelected = prev.includes(dayId);
      if (isSelected) {
        return prev.filter(id => id !== dayId);
      } else {
        setConfigs(prevConfigs => ({
          ...prevConfigs,
          [dayId]: prevConfigs[dayId] || { service: 'casual', subType: 'presencial', startTime: '09:00', endTime: '13:00' }
        }));
        return [...prev, dayId];
      }
    });
  };

  const handleConfigChange = (dayId: string, field: keyof DayConfig, value: string) => {
    setConfigs(prev => {
      const currentConfig = prev[dayId];
      let newConfig = { ...currentConfig, [field]: value };

      // Auto-adjust times if restricted service is picked, else give full freedom
      if (field === 'service') {
        if (value === 'nocturno') {
          newConfig.startTime = '20:00';
          newConfig.endTime = '00:00';
        }
      }

      return { ...prev, [dayId]: newConfig };
    });
  };

  const getAvailableTimeOptions = (serviceType: string) => {
    if (serviceType === 'nocturno') {
      const nightOptions = [];
      for (let i = 20; i <= 23; i++) {
        nightOptions.push(`${i}:00`, `${i}:30`);
      }
      for (let i = 0; i <= 5; i++) {
        nightOptions.push(`0${i}:00`, `0${i}:30`);
      }
      nightOptions.push('06:00'); // End bound
      return nightOptions;
    }
    // Fijo and Casual have access to the full clock now so they can cross midnight securely
    return TIME_OPTIONS_FULL;
  };

  const calculateTotal = () => {
    if (selectedDays.length === 0) {
      setTotal(0);
      return;
    }

    const kids = Math.max(1, typeof children === 'number' ? children : parseInt(children as string) || 0);
    let masterTotal = 0;

    selectedDays.forEach(dayId => {
      const config = configs[dayId] || { service: 'casual', subType: 'presencial', startTime: '09:00', endTime: '13:00' };

      const [startHr, startMin] = config.startTime.split(':').map(Number);
      const [endHr, endMin] = config.endTime.split(':').map(Number);

      let startMinsTotal = startHr * 60 + startMin;
      let endMinsTotal = endHr * 60 + endMin;

      // Handle midnight crossing
      if (endMinsTotal <= startMinsTotal) {
        endMinsTotal += 24 * 60;
      }

      const diffMins = endMinsTotal - startMinsTotal;
      if (diffMins <= 0) return;

      const baseHrsGlobal = Math.floor(diffMins / 60);
      const minsGlobal = (diffMins % 60) > 0 ? 0.5 : 0;
      const totalDurationGlobal = baseHrsGlobal + minsGlobal;

      let priceForThisDay = 0;

      switch (config.service) {
        case 'casual': {
          const firstHrBase = 7000;
          const extraKidsCost = totalDurationGlobal * Math.max(0, kids - 2) * 2000;
          priceForThisDay = (baseHrsGlobal * firstHrBase) + (minsGlobal > 0 ? firstHrBase / 2 : 0) + extraKidsCost;
          break;
        }
        case 'fijo': {
          // Rule: Fijo costs 7000 first hr, 5000 next hrs EXCEPT between 20:00 and 06:00 where it behaves like Nocturno (7000/hr).
          let dayMins = 0;
          let nightMins = 0;

          // Process 30-min jumps
          for (let m = startMinsTotal; m < endMinsTotal; m += 30) {
            const timeOfDay = m % (24 * 60); // Time in minutes within a 24h clock
            const isNight = timeOfDay >= (20 * 60) || timeOfDay < (6 * 60);
            if (isNight) nightMins += 30;
            else dayMins += 30;
          }

          const exactDayHrs = dayMins / 60;
          const exactNightHrs = nightMins / 60;

          const baseDayHrs = Math.floor(exactDayHrs);
          const halfDayMins = (exactDayHrs - baseDayHrs) > 0 ? 0.5 : 0;
          const totalDay = baseDayHrs + halfDayMins;

          const baseNightHrs = Math.floor(exactNightHrs);
          const halfNightMins = (exactNightHrs - baseNightHrs) > 0 ? 0.5 : 0;
          const totalNight = baseNightHrs + halfNightMins;

          let dayCost = 0;
          if (totalDay > 0) {
            if (baseDayHrs === 0 && halfDayMins > 0) {
              dayCost = 3500; // Half of 1st hour base
            } else {
              dayCost = 7000 + (Math.max(0, baseDayHrs - 1) * 5000) + (halfDayMins > 0 ? 3500 : 0);
            }
          }

          let nightCost = 0;
          if (totalNight > 0) {
            if (totalDay === 0) {
              // Started purely in night, act as Nocturno (8000 first hr)
              if (baseNightHrs === 0 && halfNightMins > 0) {
                nightCost = 4000;
              } else {
                nightCost = 8000 + (Math.max(0, baseNightHrs - 1) * 7000) + (halfNightMins > 0 ? 4000 : 0);
              }
            } else {
              // Started in day, continued into night. Nocturno ongoing rate applied.
              nightCost = (baseNightHrs * 7000) + (halfNightMins > 0 ? 3500 : 0);
            }
          }

          const extraKidsCost = totalDurationGlobal * Math.max(0, kids - 2) * 2000;
          priceForThisDay = dayCost + nightCost + extraKidsCost;
          break;
        }
        case 'nocturno': {
          const firstHrBase = 8000;
          const nextHrBase = 7000;
          const extraKidsCost = totalDurationGlobal * Math.max(0, kids - 2) * 2000;

          if (baseHrsGlobal === 0 && minsGlobal > 0) {
            priceForThisDay = (firstHrBase / 2) + extraKidsCost;
          } else {
            priceForThisDay = firstHrBase + (Math.max(0, baseHrsGlobal - 1) * nextHrBase) + (minsGlobal > 0 ? firstHrBase / 2 : 0) + extraKidsCost;
          }
          break;
        }
        case 'estimulacion': {
          const base = 12000;
          priceForThisDay = (baseHrsGlobal * base) + (minsGlobal > 0 ? base / 2 : 0);
          break;
        }
        case 'jardin': {
          const base = 12000;
          priceForThisDay = (baseHrsGlobal * base) + (minsGlobal > 0 ? base / 2 : 0);
          break;
        }
        case 'clases': {
          const base = config.subType === 'presencial' ? 15000 : 12000;
          priceForThisDay = (baseHrsGlobal * base) + (minsGlobal > 0 ? base / 2 : 0);
          break;
        }
      }

      masterTotal += priceForThisDay;
    });

    setTotal(masterTotal);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setChildren(isNaN(val) ? 1 : Math.max(1, val));
  };

  // Helper inside for WhatsApp formatting
  const generateMessageSummary = () => {
    let summary = `📍 *Solicitud de Cotización Babysis*\n\n`;

    const regionName = REGIONES.find(r => r.id === region)?.name || '';
    const comunaDisplay = comuna ? comuna : 'No especificada';
    const addr = direccion.trim() ? direccion.trim() : 'No especificada';
    const dptoStr = depto.trim() ? ` (Depto/Casa: ${depto.trim()})` : '';

    summary += `*Dirección:* ${addr}${dptoStr}, ${comunaDisplay}, ${regionName}\n`;

    // Check if any babysitter is selected to mention children count
    const hasBabysitter = selectedDays.some(id => ['casual', 'fijo', 'nocturno'].includes(configs[id]?.service));
    if (hasBabysitter) {
      summary += `*Niños:* ${children}\n`;
    }

    summary += `\n*Horarios solicitados:*\n`;
    selectedDays.forEach(dayId => {
      const dayName = DAYS_OF_WEEK.find(d => d.id === dayId)?.full;
      const config = configs[dayId] || { service: 'casual', startTime: '09:00', endTime: '13:00' };
      const serviceName = config.service.charAt(0).toUpperCase() + config.service.slice(1);
      const subT = config.service === 'clases' ? ` (${config.subType})` : '';

      summary += `- ${dayName}: ${serviceName}${subT} de ${config.startTime} a ${config.endTime}\n`;
    });
    summary += `\n*Total Estimado:* ${formatPrice(total)}`;
    return summary;
  };

  const contactLink = `https://wa.me/56922244956?text=${encodeURIComponent(generateMessageSummary())}`;

  // If any selected day is a babysitter service, render children input
  const showChildrenInput = selectedDays.some(id => {
    const s = configs[id]?.service;
    return ['casual', 'fijo', 'nocturno'].includes(s);
  });

  return (
    <section id="calculator" className="section calculator-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">Cotiza tu Servicio</span>
          <h2 className="section-title">Calculadora de Precios</h2>
          <p className="section-description">
            Estima el valor de nuestros servicios de forma rápida, día por día.
          </p>
        </div>

        <div className="calculator-card">
          <div className="calculator-grid">

            {/* Region and Comuna Selection */}
            <div className="calc-group">
              <label htmlFor="region">Región</label>
              <select
                id="region"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setComuna(e.target.value === 'V' ? 'Algarrobo' : '');
                }}
                className="calc-select"
              >
                {REGIONES.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="calc-group">
              <label htmlFor="comuna">Comuna</label>
              <select
                id="comuna"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                className="calc-select"
              >
                <option value="">Seleccionar comuna...</option>
                {(region === 'RM' ? COMUNAS_RM : COMUNAS_V).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Address Details */}
            <div className="calc-group">
              <label htmlFor="direccion">Dirección Exácta</label>
              <div className="calc-input-wrapper">
                <input
                  type="text"
                  id="direccion"
                  placeholder="Ej: Av. Las Condes 1234"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="calc-input"
                />
              </div>
            </div>

            <div className="calc-group">
              <label htmlFor="depto">Nº Depto / Casa (Opcional)</label>
              <div className="calc-input-wrapper">
                <input
                  type="text"
                  id="depto"
                  placeholder="Ej: Depto 402 / Casa 5"
                  value={depto}
                  onChange={(e) => setDepto(e.target.value)}
                  className="calc-input"
                />
              </div>
            </div>

            {/* Global Days Selector */}
            <div className="calc-group full-width">
              <label>Días Requeridos</label>
              <div className="days-selector">
                {DAYS_OF_WEEK.map(day => (
                  <button
                    key={day.id}
                    type="button"
                    className={`day-btn ${selectedDays.includes(day.id) ? 'active' : ''}`}
                    onClick={() => toggleDay(day.id)}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
              {selectedDays.length === 0 && (
                <small className="calc-hint text-red-500">Por favor, selecciona al menos un día.</small>
              )}
            </div>

            {/* Per-Day Configurations */}
            {selectedDays.length > 0 && (
              <div className="calc-group full-width per-day-durations">
                <label>Configuración por Día Seleccionado</label>
                <div className="per-day-list">
                  {/* Map the selected days in correct order (Lu-Do) */}
                  {DAYS_OF_WEEK.filter(d => selectedDays.includes(d.id)).map(day => {
                    const config = configs[day.id] || { service: 'casual', subType: 'presencial', startTime: '09:00', endTime: '13:00' };

                    return (
                      <div key={day.id} className="per-day-item">

                        {/* Day & Service Picker */}
                        <div className="per-day-info">
                          <span className="day-name">{day.full}</span>
                          <select
                            value={config.service}
                            onChange={(e) => handleConfigChange(day.id, 'service', e.target.value)}
                            className="calc-select service-select"
                          >
                            <option value="casual">Babysitter Casual</option>
                            <option value="fijo">Babysitter Fijo</option>
                            <option value="nocturno">Babysitter Nocturno</option>
                            <option value="jardin">Jardín en Casa</option>
                            <option value="clases">Clases Particulares</option>
                            <option value="estimulacion">Estimulación Temprana</option>
                          </select>
                        </div>

                        {/* SubType (if Clases) */}
                        {config.service === 'clases' && (
                          <div className="per-day-subtype">
                            <select
                              value={config.subType}
                              onChange={(e) => handleConfigChange(day.id, 'subType', e.target.value)}
                              className="calc-select subtype-select"
                            >
                              <option value="presencial">Presencial</option>
                              <option value="online">Online</option>
                            </select>
                          </div>
                        )}

                        {/* Schedule Picker */}
                        <div className="duration-inputs compact schedule-picker">
                          <div className="calc-input-wrapper">
                            <select
                              value={config.startTime}
                              onChange={(e) => handleConfigChange(day.id, 'startTime', e.target.value)}
                              className="calc-select"
                            >
                              {getAvailableTimeOptions(config.service).map(time => <option key={time} value={time}>{time}</option>)}
                            </select>
                          </div>

                          <span className="duration-separator">a</span>

                          <div className="calc-input-wrapper">
                            <select
                              value={config.endTime}
                              onChange={(e) => handleConfigChange(day.id, 'endTime', e.target.value)}
                              className="calc-select"
                            >
                              {getAvailableTimeOptions(config.service).map(time => <option key={time} value={time}>{time}</option>)}
                            </select>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Children Input - Only show for Babysitter services */}
            {showChildrenInput && (
              <div className="calc-group full-width">
                <label htmlFor="children">Cantidad de niños</label>
                <div className="calc-input-wrapper">
                  <input
                    type="number"
                    id="children"
                    min="1"
                    value={children}
                    onChange={handleChildrenChange}
                    className="calc-input"
                  />
                  <span className="calc-unit">niño(s)</span>
                </div>
                {children >= 3 && (
                  <small className="calc-hint">Aplica cobro adicional de $2.000/hr por niño extra desde el 3ro en servicios Babysitter.</small>
                )}
              </div>
            )}
          </div>

          <div className="calculator-divider"></div>

          <div className="calculator-result text-center">
            <h3 className="mb-4 text-xl font-bold">¡Todo listo para tu cotización!</h3>
            <p className="result-note mb-6">
              Envíanos estos detalles y te responderemos a la brevedad con el valor exacto y disponibilidad.
            </p>
            <a href={contactLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-full calc-action-btn">
              Solicitar Cotización vía WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
