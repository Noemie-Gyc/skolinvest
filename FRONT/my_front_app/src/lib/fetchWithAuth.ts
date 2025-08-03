export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    let res = await fetch(url, {
        ...options,
        credentials: 'include',
    });

    if (res.status === 401) {
        const refreshRes = await fetch('http://localhost:8000/api/auth/token/refresh/', {
            method: 'POST',
            credentials: 'include',
        });

        if (refreshRes.ok) {
            res = await fetch(url, {
                ...options,
                credentials: 'include',
            });
        } else {
            window.location.href = '/admin/login';
            return null;
        }
    }

    return res;
}