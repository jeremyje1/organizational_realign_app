import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../ui/dialog';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle,
  BookOpen,
  Video,
  AlertCircle
} from 'lucide-react';

interface ConsultationBookingProps {
  assessmentId: string;
  trigger?: React.ReactNode;
  premiumTier?: 'basic' | 'premium' | 'enterprise';
  isPremium?: boolean;
}

export function ConsultationBooking({ assessmentId, trigger, premiumTier = 'basic', isPremium = false }: ConsultationBookingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Form state
  const [consultationType, setConsultationType] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [message, setMessage] = useState('');
  const [organizationSize, setOrganizationSize] = useState<string>('');
  const [urgency, setUrgency] = useState<string>('');

  // Get user's timezone by default
  React.useEffect(() => {
    if (!timezone) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTimezone(userTimezone);
    }
  }, [timezone]);

  const consultationTypes = [
    {
      value: 'strategic',
      title: 'Strategic Planning Session',
      description: 'Deep-dive strategic discussion with senior consultant',
      duration: '90 minutes',
      icon: <BookOpen className="h-5 w-5" />,
      premium: false,
      included: true
    },
    {
      value: 'implementation',
      title: 'Implementation Planning',
      description: 'Tactical planning session for recommendation execution',
      duration: '60 minutes',
      icon: <CheckCircle className="h-5 w-5" />,
      premium: true,
      included: isPremium
    },
    {
      value: 'follow-up',
      title: 'Follow-up Consultation',
      description: 'Progress review and ongoing support',
      duration: '45 minutes',
      icon: <MessageSquare className="h-5 w-5" />,
      premium: false,
      included: true
    },
    {
      value: 'executive-briefing',
      title: 'Executive Briefing',
      description: 'C-suite presentation of findings and recommendations',
      duration: '120 minutes',
      icon: <Video className="h-5 w-5" />,
      premium: true,
      included: premiumTier === 'enterprise'
    }
  ];

  const organizationSizes = [
    { value: 'small', label: 'Small (< 1,000 students)' },
    { value: 'medium', label: 'Medium (1,000 - 5,000 students)' },
    { value: 'large', label: 'Large (5,000 - 15,000 students)' },
    { value: 'enterprise', label: 'Enterprise (> 15,000 students)' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Within 2 weeks', color: 'bg-blue-100 text-blue-800' },
    { value: 'medium', label: 'Medium - Within 1 week', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High - Within 2-3 days', color: 'bg-orange-100 text-orange-800', premium: true },
    { value: 'urgent', label: 'Urgent - Within 24 hours', color: 'bg-red-100 text-red-800', premium: true }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/consultations/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          consultationType,
          preferredDate,
          preferredTime,
          timezone,
          message,
          organizationSize,
          urgency
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed to book consultation');
      }
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setConsultationType('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setOrganizationSize('');
    setUrgency('');
    setSubmitted(false);
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          {trigger || (
            <Button className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Consultation
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <DialogTitle className="text-xl mb-2">Consultation Booked!</DialogTitle>
            <DialogDescription className="text-base mb-4">
              Thank you for booking a consultation. Our team will contact you within 24 hours to confirm your appointment.
            </DialogDescription>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-700">
                <strong>Next Steps:</strong> You&apos;ll receive a confirmation email with meeting details and preparation materials.
              </p>
            </div>
            <Button onClick={() => handleClose(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Consultation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Schedule Expert Consultation
          </DialogTitle>
          <DialogDescription>
            Book a personalized consultation to discuss your assessment results and next steps.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Consultation Type Selection */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Consultation Type</Label>
            <div className="grid gap-3">
              {consultationTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    consultationType === type.value ? 'ring-2 ring-blue-500 border-blue-500' : ''
                  }`}
                  onClick={() => setConsultationType(type.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {type.icon}
                      <div className="flex-1">
                        <h3 className="font-medium">{type.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <Badge variant="outline" className="mt-2">
                          <Clock className="h-3 w-3 mr-1" />
                          {type.duration}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferred-date">Preferred Date</Label>
              <Input
                id="preferred-date"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Input
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="e.g., America/New_York"
              required
            />
          </div>

          {/* Organization Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Organization Size</Label>
              <Select value={organizationSize} onValueChange={setOrganizationSize} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {organizationSizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <Select value={urgency} onValueChange={setUrgency} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={level.color} variant="secondary">
                          {level.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Information (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any specific topics or questions you'd like to discuss..."
              rows={3}
            />
          </div>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">What to expect:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Confirmation within 24 hours</li>
                    <li>Pre-consultation materials sent 48 hours before</li>
                    <li>Meeting via secure video conference</li>
                    <li>Follow-up summary and action items</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading || !consultationType || !preferredDate || !preferredTime || !organizationSize || !urgency}
            >
              {loading ? 'Booking...' : 'Book Consultation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
