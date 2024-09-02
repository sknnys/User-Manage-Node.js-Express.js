const { SupabaseClient } = require('@supabase/supabase-js');

exports.createUser = async (req, res, supabase) => {
    const normalizedUserName = req.body.name.toLowerCase();

    try {
        const { data: users, error: selectError } = await supabase
            .from('app_user')
            .select('*')
            .eq('name', normalizedUserName);

        if (selectError) throw selectError;

        if (users.length > 0) {
            const user = users[0];
            if (user.active) {
                return res.status(400).json("Usuário já registrado no banco de dados.");
            } else {
                return res.status(400).json("Usuário já foi cadastrado e removido do banco de dados.");
            }
        }

        const { data: newUser, error: insertError } = await supabase
            .from('app_user')
            .insert([{ name: normalizedUserName }])
            .single();

        if (insertError) throw insertError;

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json("Erro ao salvar o usuário: " + error.message);
    }
};

exports.getUsers = async (req, res, supabase) => {
    try {
        const { data: users, error } = await supabase
            .from('app_user')
            .select('*')
            .eq('active', true);

        if (error) throw error;

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Erro ao buscar usuários: " + error.message);
    }
};

exports.getRemovedUsers = async (req, res, supabase) => {
    try {
        const { data: users, error } = await supabase
            .from('app_user')
            .select('*')
            .eq('active', false);

        if (error) throw error;

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Erro ao buscar usuários removidos: " + error.message);
    }
};

exports.deleteUser = async (req, res, supabase) => {
    try {
        const { id } = req.params;
        const { data: user, error: findError } = await supabase
            .from('app_user')
            .select('*')
            .eq('id', id)
            .single();

        if (findError) throw findError;

        if (!user) {
            return res.status(404).json("Usuário não encontrado.");
        }

        const { error: updateError } = await supabase
            .from('app_user')
            .update({ active: false })
            .eq('id', id);

        if (updateError) throw updateError;

        res.status(204).send();
    } catch (error) {
        res.status(500).json("Erro ao remover usuário: " + error.message);
    }
};
