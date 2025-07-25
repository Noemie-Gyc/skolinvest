import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// GET : get datas for one specific section via the ID
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  // Wait the resolution of the promise containing the paramerer to call in the URL
  const params = await props.params;
  const cookieHeader = request.headers.get('cookie') || '';
  const { id } = params;

  // We need the cookie make the call to the API
  const res = await fetch(`${baseUrl}/api/v1/sections/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
  });
  // Extract the text from the response
  const raw = await res.text();

  //if response is not Ok (code HTTP >=400), the program send an error JSON
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Erreur du backend Django', details: raw },
      { status: res.status }
    );
  }

  // otherwise, on get the JSON answer that will be used by the react client component. 
  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// PATCH: update a specific section via the ID
export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  // we extract the body of the request sent by client
  const requestBody = await request.json();
  //still need cookies for this url
  const cookieHeader = request.headers.get('cookie') || '';

  // we send the request PATCH to backend tp update the section
  const res = await fetch(`${baseUrl}/api/v1/sections/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    body: JSON.stringify(requestBody),
  });

  const raw = await res.text();
  // if there is an error, we send the error the backend has written
  if (!res.ok) {
    return NextResponse.json(
      { error: 'Erreur Django', details: raw },
      { status: res.status }
    );
  }
  // if all is good it sends the json with the data to our front that will treat it.
  return new NextResponse(raw, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// This is an asynchronous API route. Getting params is an asynchronous operation, we don't get the data immediatly. It takes some time to get the whole object data
// from the backend. The await enables the function to be executed only if the data has been prepared. It waits the data is ready to be executed.
export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const cookieHeader = request.headers.get('cookie') || '';
  const { id } = params;

  const res = await fetch(`${baseUrl}/api/v1/sections/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
  });

  if (!res.ok) {
    const raw = await res.text();
    return NextResponse.json(
      { error: 'Erreur Django', details: raw },
      { status: res.status }
    );
  }

  return new NextResponse(null, { status: 204 });
}