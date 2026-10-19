'use client'

import { useState } from 'react'
import { Check, CreditCard, MapPin, User, ArrowLeft, ArrowRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/store-context'
import { cn } from '@/lib/utils'

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = 'contact' | 'shipping' | 'payment' | 'confirmation'

interface FormData {
  email: string
  phone: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardName: string
}

interface FormErrors {
  [key: string]: string
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { cart, cartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<Step>('contact')
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: 'contact', label: 'Contact', icon: User },
    { id: 'shipping', label: 'Shipping', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'confirmation', label: 'Done', icon: Check },
  ]

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (): boolean => {
    const newErrors: FormErrors = {}

    if (currentStep === 'contact') {
      if (!formData.email) newErrors.email = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Invalid email format'
      if (!formData.phone) newErrors.phone = 'Phone is required'
    }

    if (currentStep === 'shipping') {
      if (!formData.firstName) newErrors.firstName = 'First name is required'
      if (!formData.lastName) newErrors.lastName = 'Last name is required'
      if (!formData.address) newErrors.address = 'Address is required'
      if (!formData.city) newErrors.city = 'City is required'
      if (!formData.zip) newErrors.zip = 'ZIP code is required'
      if (!formData.country) newErrors.country = 'Country is required'
    }

    if (currentStep === 'payment') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required'
      if (!formData.cardCvc) newErrors.cardCvc = 'CVC is required'
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (!validateStep()) return

    const stepOrder: Step[] = ['contact', 'shipping', 'payment', 'confirmation']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      if (currentStep === 'payment') {
        // Process payment (simulated)
        clearCart()
      }
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const stepOrder: Step[] = ['contact', 'shipping', 'payment', 'confirmation']
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handleClose = () => {
    setCurrentStep('contact')
    setFormData({
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
      cardName: '',
    })
    setErrors({})
    onOpenChange(false)
  }

  const renderInputField = (
    id: keyof FormData,
    label: string,
    type: string = 'text',
    placeholder?: string
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={formData[id]}
        onChange={(e) => handleInputChange(id, e.target.value)}
        placeholder={placeholder}
        className={cn(
          'bg-secondary/50 border-border focus:border-primary h-12',
          errors[id] && 'border-destructive'
        )}
      />
      {errors[id] && (
        <p className="text-xs text-destructive">{errors[id]}</p>
      )}
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 bg-card border-border overflow-hidden max-h-[90vh] overflow-y-auto" showCloseButton={false}>
        <DialogTitle className="sr-only">Checkout</DialogTitle>
        
        <div className="p-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 border transition-all',
                    index <= currentStepIndex
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground'
                  )}
                >
                  <step.icon className="h-4 w-4 stroke-1" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-12 h-px mx-2',
                      index < currentStepIndex ? 'bg-primary' : 'bg-border'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {currentStep === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-foreground mb-2">
                  Contact Information
                </h2>
                <p className="text-muted-foreground text-sm">
                  We&apos;ll use this to send your order confirmation.
                </p>
              </div>
              <div className="space-y-4">
                {renderInputField('email', 'Email Address', 'email', 'your@email.com')}
                {renderInputField('phone', 'Phone Number', 'tel', '+1 (555) 000-0000')}
              </div>
            </div>
          )}

          {currentStep === 'shipping' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-foreground mb-2">
                  Shipping Address
                </h2>
                <p className="text-muted-foreground text-sm">
                  Where should we deliver your masterpiece?
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {renderInputField('firstName', 'First Name', 'text', 'John')}
                {renderInputField('lastName', 'Last Name', 'text', 'Doe')}
              </div>
              <div className="space-y-4">
                {renderInputField('address', 'Street Address', 'text', '123 Art Gallery Lane')}
                <div className="grid grid-cols-2 gap-4">
                  {renderInputField('city', 'City', 'text', 'New York')}
                  {renderInputField('state', 'State', 'text', 'NY')}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {renderInputField('zip', 'ZIP Code', 'text', '10001')}
                  {renderInputField('country', 'Country', 'text', 'United States')}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'payment' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light text-foreground mb-2">
                  Payment Details
                </h2>
                <p className="text-muted-foreground text-sm">
                  Your payment information is encrypted and secure.
                </p>
              </div>
              <div className="space-y-4">
                {renderInputField('cardNumber', 'Card Number', 'text', '4242 4242 4242 4242')}
                <div className="grid grid-cols-2 gap-4">
                  {renderInputField('cardExpiry', 'Expiry Date', 'text', 'MM/YY')}
                  {renderInputField('cardCvc', 'CVC', 'text', '123')}
                </div>
                {renderInputField('cardName', 'Cardholder Name', 'text', 'John Doe')}
              </div>

              <Separator className="bg-border" />

              {/* Order Summary */}
              <div className="space-y-3">
                <h3 className="text-sm tracking-[0.1em] uppercase text-muted-foreground">
                  Order Summary
                </h3>
                {cart.map((item) => (
                  <div
                    key={`${item.sculpture.id}-${item.selectedMaterial}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-foreground">
                      {item.sculpture.name} ({item.selectedMaterial}) × {item.quantity}
                    </span>
                    <span className="text-muted-foreground">
                      {formatPrice(item.sculpture.price * item.quantity)}
                    </span>
                  </div>
                ))}
                <Separator className="bg-border" />
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-xl text-primary">{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 border border-primary bg-primary/10 flex items-center justify-center">
                <Check className="h-8 w-8 text-primary stroke-1" />
              </div>
              <h2 className="text-3xl font-light text-foreground mb-4">
                Thank You
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your order has been placed successfully. You&apos;ll receive a confirmation
                email at <span className="text-primary">{formData.email}</span> shortly.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Order Reference: <span className="text-foreground">SG-{Date.now().toString(36).toUpperCase()}</span>
              </p>
              <Button
                onClick={handleClose}
                className="h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.15em] uppercase"
              >
                Continue Shopping
              </Button>
            </div>
          )}

          {/* Navigation */}
          {currentStep !== 'confirmation' && (
            <div className="flex gap-4 mt-8">
              {currentStep !== 'contact' && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 h-14 border-border hover:border-primary hover:text-primary text-sm tracking-[0.15em] uppercase"
                >
                  <ArrowLeft className="h-4 w-4 stroke-1 mr-2" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-sm tracking-[0.15em] uppercase"
              >
                {currentStep === 'payment' ? 'Place Order' : 'Continue'}
                <ArrowRight className="h-4 w-4 stroke-1 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
