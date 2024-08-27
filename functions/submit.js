export async function onRequest(context) {
  try {
      const { name, count } = await context.request.json();
      const region = await context.request.cf?.region || "Unkonwn";
      const time = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

      if(!(name.length <= 10 && name.length >= 0 && count >= 0)) {
        return new Response("Error type", { status: 500 });
      }

      const stmt = context.env.DB.prepare(
        'INSERT INTO RANK (REGION, NAME, COUNT, TIME) VALUES (?, ?, ?, ?)'
      );
      await stmt.bind(region, name, count, time).run();

      return new Response('Submission successful', { status: 200 });

  } catch (error) {
      return new Response(error.message, { status: 500 });
  }
}