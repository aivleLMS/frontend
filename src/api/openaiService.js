export async function generateBookCoverImage(apiKey, prompt, model = 'dall-e-3', quality = 'standard', style = 'vivid') {
  const requestBody = {
    model,
    prompt,
    n: 1,
    size: '1024x1024',
    response_format: 'url',
    ...(model === 'dall-e-3' && {
      quality,
      style,
    }),
  };
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),

  });
  console.log('OpenAI API 응답 상태 : ', response.status);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('OpenAI API 오류 응답: ', errorData);
    throw new Error(errorData.error?.message || 'OpenAI API 호출 실패');
  }
  const data = await response.json();
  console.log('OpenAI API 응답 데이터: ', data);
  
  return data.data[0].url;
}