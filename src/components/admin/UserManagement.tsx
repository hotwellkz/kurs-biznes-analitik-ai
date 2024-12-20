import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  tokens: number;
}

interface AuthUser {
  id: string;
  email?: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      const authUsers = authData?.users as AuthUser[] || [];

      if (profilesError || authError) throw new Error('Failed to fetch users');

      const combinedUsers = profiles?.map(profile => {
        const authUser = authUsers.find(u => u.id === profile.id);
        return {
          id: profile.id,
          email: authUser?.email || '',
          tokens: profile.tokens || 0
        };
      });

      setUsers(combinedUsers || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateTokens = async (userId: string, newTokens: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ tokens: newTokens })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Токены обновлены",
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить токены",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;

      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      if (profileError) throw profileError;

      toast({
        title: "Успешно",
        description: "Пользователь удален",
      });

      fetchUsers();
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пользователя",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center text-white">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Управление пользователями</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Токены</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="text-white">{user.email}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={user.tokens}
                    onChange={(e) => handleUpdateTokens(user.id, parseInt(e.target.value))}
                    className="w-24 bg-secondary text-white"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};