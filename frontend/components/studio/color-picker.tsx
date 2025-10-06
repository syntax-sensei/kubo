"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

const presetColors = [
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#f59e0b", // Amber
  "#10b981", // Emerald
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#06b6d4", // Cyan
]

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-10 cursor-pointer rounded-lg border-2 border-border"
          />
        </div>
        <Input value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 font-mono text-sm" />
      </div>
      <div className="flex gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className="h-8 w-8 rounded-lg border-2 border-border transition-transform hover:scale-110"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  )
}
