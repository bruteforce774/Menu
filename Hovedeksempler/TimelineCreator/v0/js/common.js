function formatDate(date) {
    return new Date(date).toLocaleDateString('nb-NO', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
}