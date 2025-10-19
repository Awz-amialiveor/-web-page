import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Upload, Send, User as UserIcon, X, ThumbsUp, MessageCircle, Edit2, Trash2, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import swallowLogo from 'figma:asset/d6cb565b63b68f25dccba1500ec7a1dfd6f73884.png';

interface Reply {
  id: string;
  name: string;
  message: string;
  date: string;
}

interface FeedbackItem {
  id: string;
  name: string;
  message: string;
  photo?: string;
  date: string;
  likes: number;
  replies: Reply[];
}

export function FeedbackPage() {
  const { t } = useLanguage();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMessage, setEditMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyData, setReplyData] = useState({ name: '', message: '' });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      name: formData.name,
      message: formData.message,
      photo: photoPreview || undefined,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: []
    };
    
    setFeedbackItems([newFeedback, ...feedbackItems]);
    setFormSubmitted(true);
    
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', message: '' });
      setPhotoPreview(null);
    }, 3000);
  };

  const handleLike = (id: string) => {
    setFeedbackItems(items =>
      items.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleEdit = (id: string, currentMessage: string) => {
    setEditingId(id);
    setEditMessage(currentMessage);
  };

  const handleSaveEdit = (id: string) => {
    setFeedbackItems(items =>
      items.map(item =>
        item.id === id ? { ...item, message: editMessage } : item
      )
    );
    setEditingId(null);
    setEditMessage('');
  };

  const handleDelete = (id: string) => {
    setFeedbackItems(items => items.filter(item => item.id !== id));
  };

  const handleReplySubmit = (feedbackId: string) => {
    if (!replyData.name || !replyData.message) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      name: replyData.name,
      message: replyData.message,
      date: new Date().toISOString().split('T')[0]
    };

    setFeedbackItems(items =>
      items.map(item =>
        item.id === feedbackId
          ? { ...item, replies: [...item.replies, newReply] }
          : item
      )
    );

    setReplyingTo(null);
    setReplyData({ name: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F6]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-gradient-to-br from-[#FAF8F6] to-white">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 opacity-10">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1529333241059-0025c612c0ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl text-[#1A1816] mb-6 tracking-tight">
              {t('feedback.hero.title')}
            </h1>
            <p className="text-lg text-[#8B7E74] max-w-2xl mx-auto">
              {t('feedback.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Share Form Section */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 swallow-pattern" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white border-2 border-[#8B7E74]/20 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-10 md:p-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B85C50] to-[#D4887E] rounded-2xl flex items-center justify-center">
                    <Heart size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl text-[#1A1816]">
                    {t('feedback.share.title')}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-[#1A1816]">
                      <UserIcon size={16} className="text-[#8B7E74]" />
                      {t('feedback.form.name')}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl py-6"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="flex items-center gap-2 text-[#1A1816]">
                      <Send size={16} className="text-[#8B7E74]" />
                      {t('feedback.form.message')}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl resize-none"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="photo" className="flex items-center gap-2 text-[#1A1816]">
                      <Upload size={16} className="text-[#8B7E74]" />
                      {t('feedback.form.photo')}
                    </Label>
                    
                    {photoPreview ? (
                      <div className="relative inline-block">
                        <img 
                          src={photoPreview} 
                          alt="Preview" 
                          className="w-40 h-40 object-cover rounded-xl border-2 border-[#8B7E74]/30"
                        />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-[#B85C50] text-white rounded-full flex items-center justify-center hover:bg-[#9A4A3E] transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          id="photo"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="photo"
                          className="flex items-center justify-center gap-3 p-8 bg-[#FAF8F6] border-2 border-dashed border-[#8B7E74]/30 rounded-xl cursor-pointer hover:border-[#B85C50] hover:bg-[#B85C50]/5 transition-all"
                        >
                          <Upload size={24} className="text-[#8B7E74]" />
                          <span className="text-[#8B7E74]">Click to upload photo</span>
                        </label>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={formSubmitted}
                    className="w-full bg-gradient-to-r from-[#B85C50] to-[#9A4A3E] text-white hover:shadow-xl py-6 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    {formSubmitted ? (
                      <>{t('feedback.form.success')}</>
                    ) : (
                      <>
                        <Send className="mr-2" size={20} />
                        {t('feedback.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Community Stories Section */}
      <section className="py-20 bg-gradient-to-br from-[#FAF8F6] to-white relative overflow-hidden">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 opacity-5">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-[#1A1816] mb-4">
              {t('feedback.stories.title')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#B85C50] to-[#D4887E] rounded-full mx-auto" />
          </motion.div>

          {feedbackItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#8B7E74] text-lg">
                {t('feedback.stories.empty') || 'No feedback yet. Be the first to share your story!'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feedbackItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white border-2 border-[#8B7E74]/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    {item.photo && (
                      <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-2xl">
                        <img 
                          src={item.photo} 
                          alt="" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      {editingId === item.id ? (
                        <div className="space-y-3">
                          <Textarea
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="bg-[#FAF8F6] border-2 border-[#8B7E74]/30 text-[#1A1816] focus:border-[#B85C50] rounded-xl"
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleSaveEdit(item.id)}
                              size="sm"
                              className="bg-[#B85C50] text-white hover:bg-[#9A4A3E]"
                            >
                              <Check size={16} className="mr-1" />
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingId(null)}
                              size="sm"
                              variant="outline"
                              className="border-[#8B7E74]/40"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-[#1A1816] mb-4 leading-relaxed">
                          "{item.message}"
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between pt-4 border-t border-[#8B7E74]/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#B85C50] to-[#D4887E] rounded-full flex items-center justify-center">
                            <UserIcon size={18} className="text-white" />
                          </div>
                          <span className="text-[#1A1816]">{item.name}</span>
                        </div>
                        <span className="text-sm text-[#8B7E74]">{item.date}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          onClick={() => handleLike(item.id)}
                          variant="outline"
                          size="sm"
                          className="border-[#8B7E74]/30 hover:border-[#B85C50] hover:bg-[#B85C50]/5 flex items-center gap-2"
                        >
                          <ThumbsUp size={14} className={item.likes > 0 ? 'fill-[#B85C50] text-[#B85C50]' : ''} />
                          <span className="text-xs">{item.likes}</span>
                        </Button>
                        
                        <Button
                          onClick={() => setReplyingTo(replyingTo === item.id ? null : item.id)}
                          variant="outline"
                          size="sm"
                          className="border-[#8B7E74]/30 hover:border-[#B85C50] hover:bg-[#B85C50]/5 flex items-center gap-2"
                        >
                          <MessageCircle size={14} />
                          <span className="text-xs">{item.replies.length}</span>
                        </Button>

                        <Button
                          onClick={() => handleEdit(item.id, item.message)}
                          variant="outline"
                          size="sm"
                          className="border-[#8B7E74]/30 hover:border-[#B85C50] hover:bg-[#B85C50]/5"
                        >
                          <Edit2 size={14} />
                        </Button>

                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="outline"
                          size="sm"
                          className="border-[#8B7E74]/30 hover:border-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </Button>
                      </div>

                      {/* Replies Section */}
                      {item.replies.length > 0 && (
                        <div className="mt-4 space-y-2 pl-4 border-l-2 border-[#B85C50]/30">
                          {item.replies.map((reply) => (
                            <div key={reply.id} className="bg-[#FAF8F6] p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-6 h-6 bg-gradient-to-br from-[#B85C50] to-[#D4887E] rounded-full flex items-center justify-center">
                                  <UserIcon size={12} className="text-white" />
                                </div>
                                <span className="text-sm text-[#1A1816]">{reply.name}</span>
                                <span className="text-xs text-[#8B7E74]">{reply.date}</span>
                              </div>
                              <p className="text-sm text-[#1A1816] ml-8">{reply.message}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Form */}
                      {replyingTo === item.id && (
                        <div className="mt-4 space-y-3 p-4 bg-[#FAF8F6] rounded-xl">
                          <Input
                            placeholder="Your name"
                            value={replyData.name}
                            onChange={(e) => setReplyData({ ...replyData, name: e.target.value })}
                            className="bg-white border-[#8B7E74]/30"
                          />
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyData.message}
                            onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
                            className="bg-white border-[#8B7E74]/30"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleReplySubmit(item.id)}
                              size="sm"
                              className="bg-[#B85C50] text-white hover:bg-[#9A4A3E]"
                            >
                              <Send size={14} className="mr-1" />
                              Reply
                            </Button>
                            <Button
                              onClick={() => setReplyingTo(null)}
                              size="sm"
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}