import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, User, Calendar, Award, Briefcase, CreditCard, Calculator, TrendingUp, Heart, Users, Zap } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Slider } from '../ui/slider';
import { Progress } from '../ui/progress';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

export function TestPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'calculator' | 'assessment' | 'booking'>('calculator');
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Social Value Calculator State
  const [socialScore, setSocialScore] = useState({
    age: 50,
    occupation: 5,
    community: 5,
    health: 5,
    creativity: 5,
    family: 5,
  });

  // Fixed calculation logic - more balanced scoring
  const calculateSocialValue = () => {
    // Age scoring: peak at 35-45, declining after
    const ageScore = socialScore.age <= 45 ? 
      Math.min(10, (socialScore.age / 45) * 10) : 
      Math.max(0, 10 - ((socialScore.age - 45) / 5));
    
    // All other factors contribute equally (0-10 each)
    const occupationScore = socialScore.occupation;
    const communityScore = socialScore.community;
    const healthScore = socialScore.health;
    const creativityScore = socialScore.creativity;
    const familyScore = socialScore.family;
    
    // Total out of 60, then convert to percentage
    const total = (ageScore + occupationScore + communityScore + healthScore + creativityScore + familyScore) / 60 * 100;
    
    return Math.round(Math.min(100, Math.max(0, total)));
  };

  // Real-time calculation
  const socialValue = calculateSocialValue();
  
  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: t('test.calculator.elite'), color: 'text-[#B85C50]', bgColor: 'bg-[#B85C50]/10' };
    if (score >= 60) return { label: t('test.calculator.high'), color: 'text-[#D4887E]', bgColor: 'bg-[#D4887E]/10' };
    if (score >= 40) return { label: t('test.calculator.standard'), color: 'text-[#8B7E74]', bgColor: 'bg-[#8B7E74]/10' };
    return { label: t('test.calculator.basic'), color: 'text-[#C4BDB6]', bgColor: 'bg-[#C4BDB6]/10' };
  };

  const category = getScoreCategory(socialValue);

  // Booking State
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    consultationType: 'virtual',
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setBookingData({
        name: '',
        email: '',
        date: '',
        time: '',
        consultationType: 'virtual',
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-[#FAF8F6] to-white">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl text-[#1A1816] mb-4">
              {t('test.hero.title')}
            </h1>
            <p className="text-lg text-[#8B7E74] max-w-2xl mx-auto">
              {t('test.hero.subtitle')}
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-2xl p-2 shadow-xl border-2 border-[#8B7E74]/20">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`px-8 py-3 rounded-xl transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-gradient-to-r from-[#B85C50] to-[#9A4A3E] text-white shadow-lg'
                    : 'text-[#8B7E74] hover:text-[#1A1816] hover:bg-[#FAF8F6]'
                }`}
              >
                <Calculator className="inline mr-2" size={18} />
                {t('test.tab.calculator')}
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`px-8 py-3 rounded-xl transition-all ${
                  activeTab === 'assessment'
                    ? 'bg-gradient-to-r from-[#B85C50] to-[#9A4A3E] text-white shadow-lg'
                    : 'text-[#8B7E74] hover:text-[#1A1816] hover:bg-[#FAF8F6]'
                }`}
              >
                <Award className="inline mr-2" size={18} />
                {t('test.tab.assessment')}
              </button>
              <button
                onClick={() => setActiveTab('booking')}
                className={`px-8 py-3 rounded-xl transition-all ${
                  activeTab === 'booking'
                    ? 'bg-gradient-to-r from-[#B85C50] to-[#9A4A3E] text-white shadow-lg'
                    : 'text-[#8B7E74] hover:text-[#1A1816] hover:bg-[#FAF8F6]'
                }`}
              >
                <Calendar className="inline mr-2" size={18} />
                {t('test.tab.booking')}
              </button>
            </div>
          </div>

          {/* Social Value Calculator Tab */}
          {activeTab === 'calculator' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white border-2 border-[#8B7E74]/20 overflow-hidden shadow-2xl rounded-3xl">
                <div className="p-10 md:p-12">
                  <div className="grid md:grid-cols-2 gap-16">
                    {/* Calculator Inputs */}
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-3xl text-[#1A1816] mb-2 flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#B85C50] to-[#D4887E] rounded-2xl flex items-center justify-center">
                            <Calculator className="text-white" size={24} />
                          </div>
                          {t('test.calculator.title')}
                        </h3>
                        <p className="text-[#8B7E74] mb-8 mt-4">
                          {t('test.calculator.desc')}
                        </p>
                      </div>

                      {/* Age */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[#1A1816]">
                          <User size={16} className="text-[#8B7E74]" />
                          {t('test.calculator.age')}: {socialScore.age}
                        </Label>
                        <Slider
                          value={[socialScore.age]}
                          onValueChange={(value) => setSocialScore({ ...socialScore, age: value[0] })}
                          min={18}
                          max={100}
                          step={1}
                          className="cursor-pointer"
                        />
                      </div>

                      {/* Occupation Impact */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[#1A1816]">
                          <Briefcase size={16} className="text-[#8B7E74]" />
                          {t('test.calculator.occupation')}: {socialScore.occupation}/10
                        </Label>
                        <Slider
                          value={[socialScore.occupation]}
                          onValueChange={(value) => setSocialScore({ ...socialScore, occupation: value[0] })}
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>

                      {/* Community Contribution */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[#1A1816]">
                          <Users size={16} className="text-[#8B7E74]" />
                          {t('test.calculator.community')}: {socialScore.community}/10
                        </Label>
                        <Slider
                          value={[socialScore.community]}
                          onValueChange={(value) => setSocialScore({ ...socialScore, community: value[0] })}
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>

                      {/* Health Status */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[#1A1816]">
                          <Heart size={16} className="text-[#8B7E74]" />
                          {t('test.calculator.health')}: {socialScore.health}/10
                        </Label>
                        <Slider
                          value={[socialScore.health]}
                          onValueChange={(value) => setSocialScore({ ...socialScore, health: value[0] })}
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>

                      {/* Creativity & Innovation */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[#1A1816]">
                          <Zap size={16} className="text-[#8B7E74]" />
                          {t('test.calculator.creativity')}: {socialScore.creativity}/10
                        </Label>
                        <Slider
                          value={[socialScore.creativity]}
                          onValueChange={(value) => setSocialScore({ ...socialScore, creativity: value[0] })}
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>

                      {/* Family Connections */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-[#1A1816]">
                          <Heart size={16} className="text-[#8B7E74]" />
                          {t('test.calculator.family')}: {socialScore.family}/10
                        </Label>
                        <Slider
                          value={[socialScore.family]}
                          onValueChange={(value) => setSocialScore({ ...socialScore, family: value[0] })}
                          min={1}
                          max={10}
                          step={1}
                        />
                      </div>
                    </div>

                    {/* Results Display */}
                    <div className="flex flex-col justify-center">
                      <div className="bg-gradient-to-br from-[#FAF8F6] to-white p-10 rounded-3xl border-2 border-[#8B7E74]/20 shadow-inner">
                        <div className="text-center mb-8">
                          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-6 border-4 border-[#B85C50]/20">
                            <TrendingUp size={40} className="text-[#B85C50]" />
                          </div>
                          <h4 className="text-[#8B7E74] mb-3">{t('test.calculator.score')}</h4>
                          <div className="text-7xl bg-gradient-to-r from-[#B85C50] to-[#D4887E] bg-clip-text text-transparent mb-3">
                            {socialValue}
                          </div>
                          <div className={`inline-block px-5 py-2 rounded-full ${category.bgColor} ${category.color} border-2 border-current`}>
                            {category.label} {t('test.calculator.tier')}
                          </div>
                        </div>

                        <div className="mb-8">
                          <Progress value={socialValue} className="h-4 rounded-full" />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm">
                            <span className="text-[#8B7E74]">{t('test.calculator.access')}</span>
                            <span className="text-[#1A1816]">{socialValue >= 60 ? t('test.calculator.full') : t('test.calculator.limited')}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm">
                            <span className="text-[#8B7E74]">{t('test.calculator.priority')}</span>
                            <span className="text-[#1A1816]">{category.label}</span>
                          </div>
                          <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-sm">
                            <span className="text-[#8B7E74]">{t('test.calculator.customization')}</span>
                            <span className="text-[#1A1816]">{socialValue >= 70 ? t('test.calculator.premium') : t('test.calculator.standard')}</span>
                          </div>
                        </div>

                        <div className="mt-8 p-5 bg-[#B85C50]/10 rounded-2xl border-2 border-[#B85C50]/20">
                          <p className="text-sm text-[#1A1816]">
                            <strong>{t('test.calculator.note')}:</strong> {t('test.calculator.noteText')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Assessment Intro Tab */}
          {activeTab === 'assessment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white border-2 border-[#8B7E74]/20 overflow-hidden shadow-2xl rounded-3xl">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1516733968668-dbdce39c4651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwc3ljaG9sb2d5JTIwdGVzdCUyMG1pbmltYWx8ZW58MXx8fHwxNzYwODA5Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Assessment"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1816]/70 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <Award size={40} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-10 md:p-14 flex flex-col justify-center">
                    <div className="mb-3">
                      <div className="inline-block px-4 py-1.5 bg-[#B85C50]/10 text-[#B85C50] rounded-full text-sm mb-4 border border-[#B85C50]/20">
                        {t('test.assessment.producer')}
                      </div>
                    </div>
                    
                    <h2 className="text-3xl text-[#1A1816] mb-4">
                      {t('test.assessment.title')}
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#B85C50] to-[#D4887E] rounded-full mb-6" />
                    
                    <p className="text-[#8B7E74] mb-8 leading-relaxed">
                      {t('test.assessment.intro')}
                    </p>

                    <div className="mb-8 p-4 bg-[#FAF8F6] rounded-xl border border-[#8B7E74]/20">
                      <p className="text-sm text-[#8B7E74] flex items-center gap-2">
                        <Calendar size={16} />
                        {t('test.assessment.note')}
                      </p>
                    </div>

                    <Button
                      onClick={() => window.open('https://form.typeform.com/to/J4zKvwuC', '_blank')}
                      className="w-full bg-gradient-to-r from-[#B85C50] to-[#9A4A3E] text-white hover:shadow-xl py-6 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <Award className="mr-2" size={20} />
                      {t('test.assessment.button')}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Booking Consultation Tab */}
          {activeTab === 'booking' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="bg-white border-2 border-[#8B7E74]/20 overflow-hidden shadow-2xl rounded-3xl relative">
                {/* Success Message Overlay */}
                {formSubmitted && (
                  <div className="absolute inset-0 bg-white/95 z-50 flex items-center justify-center backdrop-blur-sm rounded-3xl">
                    <div className="text-center">
                      <CheckCircle2 size={64} className="text-[#B85C50] mx-auto mb-4" />
                      <p className="text-xl text-[#1A1816] mb-2">
                        {t('test.booking.success')}
                      </p>
                      <p className="text-[#8B7E74]">
                        {t('test.booking.successDesc')}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-0">
                  {/* Info Section with Image */}
                  <div className="relative overflow-hidden rounded-l-3xl">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1672917187338-7f81ecac3d3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdWx0YXRpb24lMjBtZWV0aW5nJTIwYnJpZ2h0fGVufDF8fHx8MTc2MDgwMjY3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                      alt="Consultation"
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1816]/80 to-[#1A1816]/60" />
                    
                    <div className="relative z-10 p-10 h-full flex flex-col justify-between min-h-[500px]">
                      <div>
                        <h3 className="text-3xl text-white mb-3">
                          {t('test.booking.title')}
                        </h3>
                        <div className="w-16 h-1 bg-gradient-to-r from-[#B85C50] to-[#D4887E] rounded-full mb-6" />
                        <p className="text-white/90 mb-8">
                          {t('test.booking.desc')}
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Users size={24} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-white mb-1">{t('test.booking.session')}</h4>
                            <p className="text-sm text-white/80">{t('test.booking.sessionDesc')}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Heart size={24} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-white mb-1">{t('test.booking.guidance')}</h4>
                            <p className="text-sm text-white/80">{t('test.booking.guidanceDesc')}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Zap size={24} className="text-white" />
                          </div>
                          <div>
                            <h4 className="text-white mb-1">{t('test.booking.flexible')}</h4>
                            <p className="text-sm text-white/80">{t('test.booking.flexibleDesc')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="p-10 md:p-12">
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="booking-name" className="text-[#1A1816]">
                          {t('test.booking.name')}
                        </Label>
                        <Input
                          id="booking-name"
                          value={bookingData.name}
                          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                          required
                          placeholder={t('test.booking.namePlaceholder')}
                          className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl py-6"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="booking-email" className="text-[#1A1816]">
                          {t('test.booking.email')}
                        </Label>
                        <Input
                          id="booking-email"
                          type="email"
                          value={bookingData.email}
                          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                          required
                          placeholder={t('test.booking.emailPlaceholder')}
                          className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl py-6"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="booking-date" className="text-[#1A1816]">
                            {t('test.booking.date')}
                          </Label>
                          <Input
                            id="booking-date"
                            type="date"
                            value={bookingData.date}
                            onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                            required
                            className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl py-6"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="booking-time" className="text-[#1A1816]">
                            {t('test.booking.time')}
                          </Label>
                          <Input
                            id="booking-time"
                            type="time"
                            value={bookingData.time}
                            onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                            required
                            className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl py-6"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[#1A1816]">{t('test.booking.type')}</Label>
                        <RadioGroup
                          value={bookingData.consultationType}
                          onValueChange={(value) => setBookingData({ ...bookingData, consultationType: value })}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="relative">
                            <RadioGroupItem value="virtual" id="virtual" className="peer sr-only" />
                            <Label
                              htmlFor="virtual"
                              className="flex items-center justify-center p-4 bg-[#FAF8F6] border-2 border-[#8B7E74]/30 rounded-xl cursor-pointer peer-data-[state=checked]:border-[#B85C50] peer-data-[state=checked]:bg-[#B85C50]/5 transition-all text-center"
                            >
                              <span className="text-[#1A1816]">{t('test.booking.virtual')}</span>
                            </Label>
                          </div>

                          <div className="relative">
                            <RadioGroupItem value="in-person" id="in-person" className="peer sr-only" />
                            <Label
                              htmlFor="in-person"
                              className="flex items-center justify-center p-4 bg-[#FAF8F6] border-2 border-[#8B7E74]/30 rounded-xl cursor-pointer peer-data-[state=checked]:border-[#B85C50] peer-data-[state=checked]:bg-[#B85C50]/5 transition-all text-center"
                            >
                              <span className="text-[#1A1816]">{t('test.booking.inPerson')}</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#B85C50] to-[#9A4A3E] text-white hover:shadow-xl py-6 rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        {t('test.booking.submit')}
                      </Button>

                      <p className="text-xs text-[#8B7E74] text-center">
                        {t('test.booking.terms')}
                      </p>
                    </form>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}