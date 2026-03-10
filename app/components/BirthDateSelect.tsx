import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

interface BirthDateSelectProps {
  day: string;
  setDay: (value: string) => void;
  month: string;
  setMonth: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
}

export default function BirthDateSelect({
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
}: BirthDateSelectProps) {
  // Generate date options
  const days = Array.from({length: 31}, (_, i) => (i + 1).toString());
  const months = [
    {value: '01', label: 'January'},
    {value: '02', label: 'February'},
    {value: '03', label: 'March'},
    {value: '04', label: 'April'},
    {value: '05', label: 'May'},
    {value: '06', label: 'June'},
    {value: '07', label: 'July'},
    {value: '08', label: 'August'},
    {value: '09', label: 'September'},
    {value: '10', label: 'October'},
    {value: '11', label: 'November'},
    {value: '12', label: 'December'},
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) =>
    (currentYear - i).toString(),
  );

  const triggerClassName =
    'bg-white rounded-none h-[54px]! px-4 text-body-regular!';

  return (
    <div className="flex gap-2">
      {/* Day Select */}
      <input type="hidden" name="day" value={day} />
      <Select value={day} onValueChange={setDay}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder="DD" />
        </SelectTrigger>
        <SelectContent position="popper" className="h-[320px] overflow-y-auto">
          {days.map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Month Select */}
      <input type="hidden" name="month" value={month} />
      <Select value={month} onValueChange={setMonth}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder="MM" />
        </SelectTrigger>
        <SelectContent position="popper">
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Year Select */}
      <input type="hidden" name="year" value={year} />
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className={triggerClassName}>
          <SelectValue placeholder="YYYY" />
        </SelectTrigger>
        <SelectContent position="popper" className="h-[320px] overflow-y-auto">
          {years.map((y) => (
            <SelectItem key={y} value={y}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
