import React from 'react';

// ฟังก์ชันสำหรับจัดรูปแบบเวลา
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
};

const CommentSection = ({ comments, user, onSubmit }) => {
  const [newComment, setNewComment] = React.useState({ text: '', rating: 1 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newComment);
    setNewComment({ text: '', rating: 1 });
  };

  return (
    <div className="comment-section">
      {/* กล่องแสดงความคิดเห็น */}
      <form onSubmit={handleSubmit} className="flex items-center mb-1">
        <textarea
          value={newComment.text}
          onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          placeholder="ใส่ความคิดเห็นที่นี่"
          rows="2"
          className="flex-grow p-2 border border-gray-300 rounded-lg mr-2 resize-none"
        />
        <div className="flex items-center">
          <select
            value={newComment.rating}
            onChange={(e) => setNewComment({ ...newComment, rating: parseInt(e.target.value, 10) })}
            className="mr-2 border border-gray-300 rounded-lg p-2"
          >
            <option value={1}>⭐ 1</option>
            <option value={2}>⭐ 2</option>
            <option value={3}>⭐ 3</option>
            <option value={4}>⭐ 4</option>
            <option value={5}>⭐ 5</option>
          </select>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-lg whitespace-nowrap"
          >
            ส่งความคิดเห็น
          </button>
        </div>
      </form>

      {/* ส่วนความคิดเห็นที่มีอยู่ */}
      <h1 font-bold mb-2>ความคิดเห็น</h1>
      <div className="comments-list max-h-[200px] overflow-y-auto">
        {comments.map(comment => (
          <div key={comment.id} className="comment p-4 border-b border-gray-200">
            <p className="font-semibold">ความคิดเห็นจาก {comment.user.name}</p>
            <p className="text-gray-400 text-sm">เมื่อ {formatDate(comment.createdAt)}</p>
            <p className="text-yellow-500">{'⭐'.repeat(comment.rating)}</p>
            <p className="text-gray-600">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
